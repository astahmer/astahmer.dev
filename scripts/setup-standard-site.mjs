#!/usr/bin/env node
/**
 * standard.site setup script
 *
 * Creates a site.standard.publication record on your PDS and optionally
 * creates site.standard.document records for each article.
 *
 * Usage:
 *   BSKY_HANDLE=astahmer.dev BSKY_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx node scripts/setup-standard-site.mjs
 *
 * After running:
 *   1. Copy the AT-URI printed as "Publication AT-URI" into:
 *      public/.well-known/site.standard.publication
 *   2. Copy each article's AT-URI into its frontmatter as `atUri: <value>`
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const HANDLE = process.env.BSKY_HANDLE
const APP_PASSWORD = process.env.BSKY_APP_PASSWORD
const PDS = 'https://bsky.social'

if (!HANDLE || !APP_PASSWORD) {
  console.error('Set BSKY_HANDLE and BSKY_APP_PASSWORD env vars.')
  process.exit(1)
}

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

// 1. Authenticate
console.log('Authenticating…')
const session = await rpc(`${PDS}/xrpc/com.atproto.server.createSession`, {
  identifier: HANDLE,
  password: APP_PASSWORD,
})
const { did, accessJwt } = session
console.log(`DID: ${did}`)

// 2. Create publication record
console.log('\nCreating publication record…')
const pubRecord = {
  $type: 'site.standard.publication',
  url: 'https://astahmer.dev',
  name: 'Alexandre Stahmer',
  description:
    'Freelance engineer working across type-safe frontends, developer tooling, and product systems.',
  preferences: { showInDiscover: true },
}
const pubResult = await rpc(
  `${PDS}/xrpc/com.atproto.repo.createRecord`,
  { repo: did, collection: 'site.standard.publication', record: pubRecord },
  accessJwt,
)
const pubAtUri = pubResult.uri
console.log(`\n✅ Publication AT-URI: ${pubAtUri}`)
console.log('   → Put this in: public/.well-known/site.standard.publication\n')

// 3. Create document records for each article
// Reads published articles from src/content/articles/
import { glob } from 'node:fs/promises'
import { join } from 'node:path'

const articlesDir = resolve(import.meta.dirname, '../src/content/articles')
let created = 0

for await (const file of glob('**/*.{md,mdx}', { cwd: articlesDir })) {
  const content = readFileSync(join(articlesDir, file), 'utf8')

  // Parse frontmatter manually (no dependencies)
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/u)
  if (!fmMatch) continue
  const fm = fmMatch[1]

  const isPublish = /isPublish:\s*true/u.test(fm)
  if (!isPublish) continue

  const titleMatch = fm.match(/^title:\s*['"]?(.*?)['"]?\s*$/mu)
  const dateMatch = fm.match(/^publishedAt:\s*(.+)\s*$/mu)
  const descMatch = fm.match(/^description:\s*['"]?(.*?)['"]?\s*$/mu)

  if (!titleMatch || !dateMatch) continue

  // Derive path from filename (mirror content.config.ts logic)
  const path = '/' + file.replace(/\.(md|mdx)$/u, '').replace(/(^|\/)\d+-/gu, '$1')
  const slug = path.replace(/^\//, '')

  const docRecord = {
    $type: 'site.standard.document',
    site: pubAtUri,
    title: titleMatch[1],
    path: `/posts/${slug}`,
    publishedAt: new Date(dateMatch[1].trim()).toISOString(),
    ...(descMatch ? { description: descMatch[1] } : {}),
  }

  const docResult = await rpc(
    `${PDS}/xrpc/com.atproto.repo.createRecord`,
    { repo: did, collection: 'site.standard.document', record: docRecord },
    accessJwt,
  )
  console.log(`✅ ${titleMatch[1]}`)
  console.log(`   AT-URI: ${docResult.uri}`)
  console.log(`   → Add to frontmatter of ${file}:\n   atUri: '${docResult.uri}'\n`)
  created++
}

console.log(`\nDone. Created 1 publication + ${created} document record(s).`)
