---
title: '"How does xxx compare to Panda CSS"'
publishedAt: 2023-12-02
description: "And why it's hard to answer this question"
slug: 'how-does-xxx-compares-to-panda-css'
isPublish: true
---

It's a question that I get a lot. I'd love to answer it in some way, but I don't know how to do it in a way that is fair
to **both** Panda and `xxx`. I probably haven't used `xxx` as much as Panda, I might not be aware of some of its
features, I might not be aware of some of its limitations, etc. I don't want to start a weird competition between Panda
and `xxx`.

[Even I wasn't sure how to handle the comparison table](https://twitter.com/astahmer_dev/status/1704839959469863327) on
the StyleX page when [Naman](https://twitter.com/naman34) shared the beta docs. This is a tricky topic and it's hard to
express each solution's pros and cons in a fair way, especially coming from contributors.

This is part of the reason why we don't have a comparison page in the docs. I just want to contribute to a good
technical solution that helps people, **without getting into the politics of it.**

Of course I would be, at least a bit, biased towards Panda CSS; being both a core contributor and user. That being said,
I tried different styling solutions before and there's a reason I ended up using/contributing to Panda CSS. I'm not
saying that Panda CSS is the superior styling solution out there, but it's the best solution for me and my use-cases.

## Instead, why Panda CSS?

[Panda CSS](https://panda-css.com/) is a CSS-in-JS solution that uses static analysis on your code to generate CSS.

I feel like we did a pretty great job with Panda. It's a very flexible solution that can be used in many different
environments (raw CSS with just token as CSS variables, CSS-in-JS with React, Preact, Solid, Vue, Qwik..), in many
different ways (`css` / `recipes` / `patterns` / jsx style props, with type-strictness or not, as a component library,
...) and will become even more flexible in the future. After all, the end-goal is to become
`The universal design system solution for the web`. Quite ambitious, I know, but I think we're on the right track for
that to happen. The [ecosystem](https://www.ecopanda.dev/) [is](https://park-ui.com/)
[growing](https://shadow-panda.dev/), more and more people and companies are using Panda CSS everyday !

A bit more details here: [why Panda CSS](https://panda-css.com/docs/why-panda-css).

## And why NOT Panda CSS?

Panda CSS might not be the best solution for you (and that's fine !), as always it depends on your use-case.

There a few limitations to be aware of:

### Static limitations

I think most common limitations are related to the fact that Panda CSS uses static analysis on your code to generate
CSS. This means that doing things a bit
[too dynamically might not work as expected](https://panda-css.com/docs/guides/dynamic-styling). This can be a little
confusing, when coming from runtime styling solutions that allow all kind of stuff. This to me, is a good thing, because
it forces you to write more declarative code, which is easier to read and maintain.

> You should also know that we have documented a few migration strategies such as when coming from
> [stitches](https://panda-css.com/docs/migration/stitches),
> [styled-components](https://panda-css.com/docs/migration/styled-components).
> [tw2panda](https://tailwind-to-panda.vercel.app/) might also be useful

After using it a bit, you'll get used to it and you'll know what to avoid. Basically any crazy dynamic runtime stuff,
and I say crazy because most of the time you can just forget about Panda using static analysis and it will just
work(™). I mean, look at this example:

```tsx
import { css } from 'styled-system/css'

const colorMap = {
  background: 'red',
  foreground: 'yellow',
}

const colorTints = {
  background: 400,
  foreground: '100',
}

const bgColor = colorMap.background + '.' + colorTints['background']
const getColor = (name: keyof typeof colorMap) => `${colorMap[name]}.${colorTints[name]}`

export const App = () => {
  return (
    <div
      className={css({
        color: getColor('foreground'),
        bg: bgColor,
        border: '10px solid token(colors.blue.300)',
      })}
    >
      <span>🐼</span>
    </div>
  )
}
```

Does that really feel static to you ? 😁

> You can actually play with it [here](https://play.panda-css.com/A9tp5UyceS) (and you could even go further like
> [here](https://play.panda-css.com/atCN2U0n8w))

### Lightweight JS runtime

Panda has a lightweight JS runtime (**we still generate all your CSS at build-time**), generated through the CLI codegen
step, it serves the purpose of transforming the CSS-in-JS object syntax to class names strings. While we try to keep is
as small as possible, some people might not want to add any JS.

This means that when you're passing a CSS property (ex: `color: "blue.300"`), it's not transformed to className (ex
`text_blue_300`) at compile-time, hence the lightweight JS runtime in your `outdir` (defaults to `styled-system`)

This limitation doesn't exist if you use some way to pre-render your components to static HTML, for example using
[Astro](https://astro.build/) or
[RSC](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components), the
`css` function will be removed at build-time and replaced by the generated class names.

Another way to avoid this limitation would be to use the generated class names directly (_sounds familiar ?_ ), but then
you lose all the benefits of the object-syntax: no auto-completion, no type-safety, harder style merging, etc.

You can currently
([v0.20.0](https://github.com/chakra-ui/panda/blob/d31700f8cd43032c7fe4b515e83e28311c8b9eb5/CHANGELOG.md)) do so using
the [`config.staticCss`](https://panda-css.com/docs/guides/static) option. In the future, we might add a way to find the
generated class names usage in your code (just like we do with the object-syntax) and generate the corresponding CSS
automatically.

#### Why not a bundler plugin?

> tl;dr: it's not the main goal of Panda, requires a lot of work to get right while keeping same API/DX as we currently
> have

So, since we have a lightweight JS runtime, why not just remove it and inline the generated class names directly in the
JSX using a vite plugin for example ? Indeed, some alternatives use a bundler (vite, webpack, etc) plugin that inline
their functions (equivalent of our `css`) as class strings.

We don't, we just have a `postcss` (soon to become a [`lightningcss`](https://github.com/chakra-ui/panda/pull/1544))
plugin or a CLI alternative. I actually view this as an advantage for Panda, since you can use Panda with just a
`postcss` plugin or just raw CSS files, this means it can work anywhere without a dedicated integration, cause we don't
need to transform your code.

Anyway, there has been discussions about making bundlers plugin for Panda that would always try to get rid of this
lightweight JS runtime, no matter which framework you're using, and this should actually be _relatively_ easy to do so¹,
as shown in
[this proof of concept I had made months ago](https://gist.github.com/astahmer/caa416cf39fd49b50992e3ef01a1921f).

¹. For that bundler plugin to be actually useful, we must remove **every** `css()` call, otherwise the runtime would
still be bundled if **even just 1 css call wasn't transformed to its resolved className**

Doing this will either: impose more static limitations (same as the alternatives have) than what we currently allow or
require a lot more work on our side to make that plugin cover every cases (`css`, `cva`, `sva`, `config/slot recipes`,
`patterns/jsx-patterns`, `styled` factory), _for every frameworks_ (different jsx/prop bindings)

## Great, but I still want to compare Panda CSS to `xxx`

Ideally, I'd love to see a comparison table that is maintained by the community. I think it would be a great resource
for people to make an informed decision. Something like https://github.com/andreipfeiffer/css-in-js could be a good
starting point. Also, we have [an online playground](https://play.panda-css.com/) that you can use to try out Panda CSS
using the basic examples and see if it fits your needs.

---

## Conclusion

All that being said, I'm happy to answer any specific questions you have about Panda CSS. Feel free to
[@ me on Twitter](https://twitter.com/astahmer_dev) or on [Panda CSS discord](https://discord.gg/VQrkpsgSx7).
