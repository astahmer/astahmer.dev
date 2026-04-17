#!/usr/bin/env node
/**
 * standard.site setup script
 *
 * Creates or updates a site.standard.publication record on your PDS and
 * creates or updates site.standard.document records for each article.
 *
 * Usage:
 *   BSKY_HANDLE=astahmer.dev BSKY_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx node scripts/setup-standard-site.mjs
 */

import { glob } from 'node:fs/promises'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import vm from 'node:vm'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const HANDLE = process.env.BSKY_HANDLE
const APP_PASSWORD = process.env.BSKY_APP_PASSWORD
const PDS = 'https://eurosky.social'
const PUBLICATION_COLLECTION = 'site.standard.publication'
const DOCUMENT_COLLECTION = 'site.standard.document'
const repoRoot = resolve(import.meta.dirname, '..')
const publicationFilePath = resolve(repoRoot, 'public/.well-known/site.standard.publication')
const presentationFilePath = resolve(repoRoot, 'src/data/presentation.ts')
const configFilePath = resolve(repoRoot, 'src/data/config.ts')
const articlesDir = resolve(repoRoot, 'src/content/articles')

if (!HANDLE || !APP_PASSWORD) {
  console.error('Set BSKY_HANDLE and BSKY_APP_PASSWORD env vars.')
  process.exit(1)
}

function loadTsModule(filePath) {
  const source = readFileSync(filePath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filePath,
  }).outputText

  const module = { exports: {} }
  const context = vm.createContext({
    module,
    exports: module.exports,
    require,
    console,
    process,
  })

  new vm.Script(compiled, { filename: filePath }).runInContext(context)
  return module.exports
}

function readFileIfExists(filePath) {
  try {
    return readFileSync(filePath, 'utf8')
  } catch {
    return undefined
  }
}

function parseAtUri(atUri) {
  const match = atUri?.trim().match(/^at:\/\/([^/]+)\/([^/]+)\/([^/]+)$/u)
  if (!match) return undefined

  const [, repo, collection, rkey] = match
  return { repo, collection, rkey }
}

function normalizeSiteUrl(url) {
  return String(url).replace(/\/$/u, '')
}

function updateFrontmatterAtUri(content, atUri) {
  if (/^atUri:\s*['"]?.*?['"]?\s*$/mu.test(content)) {
    return content.replace(/^atUri:\s*['"]?.*?['"]?\s*$/mu, `atUri: '${atUri}'`)
  }

  return content.replace(/^---\n([\s\S]*?)\n---/u, `---\n$1\natUri: '${atUri}'\n---`)
}

const { presentation } = loadTsModule(presentationFilePath)
const { SITE_URL } = loadTsModule(configFilePath)

async function rpc(url, body, token) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status} ${url}\n${text}`)
  }
  return res.json()
}

async function createRecord(collection, record, token, repo) {
  return rpc(
    `${PDS}/xrpc/com.atproto.repo.createRecord`,
    { repo, collection, record },
    token,
  )
}

async function putRecord(collection, rkey, record, token, repo) {
  return rpc(
    `${PDS}/xrpc/com.atproto.repo.putRecord`,
    { repo, collection, rkey, record },
    token,
  )
}

// 1. Authenticate
console.log('Authenticating…')
const session = await rpc(`${PDS}/xrpc/com.atproto.server.createSession`, {
  identifier: HANDLE,
  password: APP_PASSWORD,
})
const { did, accessJwt } = session
console.log(`DID: ${did}`)

// 2. Create or update publication record
const existingPublicationAtUri = readFileIfExists(publicationFilePath)?.trim()
const existingPublication = parseAtUri(existingPublicationAtUri)

console.log(`\n${existingPublication ? 'Updating' : 'Creating'} publication record…`)
const pubRecord = {
  $type: PUBLICATION_COLLECTION,
  url: normalizeSiteUrl(SITE_URL),
  name: presentation.name,
  description: presentation.intro,
  preferences: { showInDiscover: true },
}
const pubResult =
  existingPublication?.collection === PUBLICATION_COLLECTION
    ? await putRecord(PUBLICATION_COLLECTION, existingPublication.rkey, pubRecord, accessJwt, did)
    : await createRecord(PUBLICATION_COLLECTION, pubRecord, accessJwt, did)
const pubAtUri = pubResult.uri
writeFileSync(publicationFilePath, `${pubAtUri}\n`)
console.log(`\n✅ Publication AT-URI: ${pubAtUri}`)
console.log('   → Synced to: public/.well-known/site.standard.publication\n')

// 3. Create or update document records for each article
// Reads published articles from src/content/articles/
let created = 0
let updated = 0

for await (const file of glob('**/*.{md,mdx}', { cwd: articlesDir })) {
  const absoluteFilePath = join(articlesDir, file)
  const content = readFileSync(absoluteFilePath, 'utf8')

  // Parse frontmatter manually (no dependencies)
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/u)
  if (!fmMatch) continue
  const fm = fmMatch[1]

  const isPublish = /isPublish:\s*true/u.test(fm)
  if (!isPublish) continue

  const titleMatch = fm.match(/^title:\s*['"]?(.*?)['"]?\s*$/mu)
  const dateMatch = fm.match(/^publishedAt:\s*(.+)\s*$/mu)
  const descMatch = fm.match(/^description:\s*['"]?(.*?)['"]?\s*$/mu)
  const atUriMatch = fm.match(/^atUri:\s*['"]?(.*?)['"]?\s*$/mu)

  if (!titleMatch || !dateMatch) continue

  // Derive path from filename (mirror content.config.ts logic)
  const path = '/' + file.replace(/\.(md|mdx)$/u, '').replace(/(^|\/)\d+-/gu, '$1')
  const slug = path.replace(/^\//, '')
  const existingDocument = parseAtUri(atUriMatch?.[1])

  const docRecord = {
    $type: DOCUMENT_COLLECTION,
    site: pubAtUri,
    title: titleMatch[1],
    path: `/posts/${slug}`,
    publishedAt: new Date(dateMatch[1].trim()).toISOString(),
    ...(descMatch ? { description: descMatch[1] } : {}),
  }

  const docResult =
    existingDocument?.collection === DOCUMENT_COLLECTION
      ? await putRecord(DOCUMENT_COLLECTION, existingDocument.rkey, docRecord, accessJwt, did)
      : await createRecord(DOCUMENT_COLLECTION, docRecord, accessJwt, did)

  writeFileSync(absoluteFilePath, updateFrontmatterAtUri(content, docResult.uri))

  if (existingDocument?.collection === DOCUMENT_COLLECTION) {
    updated++
  } else {
    created++
  }

  console.log(`✅ ${titleMatch[1]} (${existingDocument ? 'updated' : 'created'})`)
  console.log(`   AT-URI: ${docResult.uri}`)
  console.log(`   → Synced to frontmatter of ${file}\n`)
}

console.log(`\nDone. Created ${created} document record(s) and updated ${updated} document record(s).`)
