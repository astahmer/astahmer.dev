---
title: '"Sorry, I Need A Panda Playground In Order To Help"'
publishedAt: 2023-10-25
description: 'Showing you how to create a Panda Playground so that I can help you with your problem.'
slug: 'need-a-playground'
isPublish: true
---

You have likely been sent this article because you asked someone a Panda question without providing a
[Panda playground](https://play.panda-css.com/) link.

Here's how to fix it.

1. Go to the [Panda Playground](https://play.panda-css.com/).

2. Write your code in the editor. You can start from a predefined example using the top-right `Examples` select.

3. If your code doesn't fit in the editor, make your example simpler and smaller. The less code you ask someone to read,
   the more likely they are to help you.

4. Make sure you comment your code to show what you expect to happen.

```ts
const [color, setColor] = useState('red.300')
// `className` is applied on the DOM element but there's no generated CSS rule for it...
const className = css({ color })
```

5. Make sure your code has NO errors except for the ones you expect to be there.

6. Save the playground state using the `Share` button in the top-right. This will provide you with a URL that you can
   share with others.

7. You can also visit the [Panda CSS discord](https://discord.gg/VQrkpsgSx7)

## Why Not A Screenshot?

If you provided a screenshot to illustrate your problem, you might be over-estimating the skill of the developers you're
asking for help.

Most developers can't just look at a screenshot and know exactly what the error is. They need to play with code in order
to understand what it does. For this, you need an IDE.

This is why the [Panda playground](https://play.panda-css.com/) is so useful - it provides shareable playgrounds that
help facilitate collaboration.

## Why Not CodeSandbox/StackBlitz?

There are several tools out there that help provide a multi-file IDE with support for actually running code.

These are great for sharing code, but they're not great for asking questions.

I've had many situations where people ask me a question using a StackBlitz/CodeSandbox link, and I have to spend 10
minutes trying to figure out what the problem is, or even in which file it originates from.

So, I've learned to dread these links.

The [Panda playground](https://play.panda-css.com/) is a much better tool for asking questions, because it provides a
single file with a single entry point.

## I can't reproduce the issue in the playground

If you can't reproduce the problem in the playground, then you're likely doing something wrong.

Unless the playground is missing a feature, you should be able to reproduce the problem in the playground as a minimal
example.

In that case, you can share a link to a github
[minimal reproduction](https://github.com/jmcdo29/wtf-is-a-minimum-reproduction) repository instead. You can use this
starter template to get started: [astahmer/panda-vite-template](https://github.com/astahmer/panda-vite-template) or you
can quickly setup a new repo using
[these steps from the Getting Started guide with Vite](https://panda-css.com/docs/installation/vite):

- `pnpm create vite@latest --template react-ts`
- `pnpm add @pandacss/dev`
- `pnpm panda init --postcss`

---

This page is an adaptation of the
["Sorry, I Need A TypeScript Playground In Order To Help"](https://www.totaltypescript.com/need-a-playground) from
[Matt Pocock](https://twitter.com/mattpocockuk)
