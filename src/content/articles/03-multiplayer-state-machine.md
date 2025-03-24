---
title: 'Making a multiplayer state machine with Durable Objects'
publishedAt: 2025-03-24
description: 'Durable Objects and the Actor model: a match made in heaven'
slug: 'multiplayer-state-machine-with-durable-objects'
isPublish: true
---

## Introduction

I've recently had to make a multiplayer trivia-like web app for a company team event.

<details>
<summary>It's the usual quizz game (click if you really care about the details):</summary>
<div>

- there are ~100 questions split in 10 categories (both hardcoded since it's a one-time event)
- different types (text, select, radio, checkboxes, sortable, poll) of questions with one/multiple correct answers
- each question has a time limit (can be set individually)
- each question gives an amount of points (you get fractional points if you have a partially valid answer; ex:
  checkboxes)
- you start by creating a room, then share the link with the other players, everybody joins
- everybody needs to be ready in order to start; then there's a timer that starts when everyone is ready
- before each question, there's a question timer that starts when the question is shown
- after each question (either everybody has confirmed their answer or the time limit is up), you either move on to the
  next question if there are any in this category, or move to the category recap
- in that recap it loops through all the questions in that category and shows the correct answers along with each
  player's answer associated with that question
- if that question is of type "text" (a free form text field), everyone can vote "correct" or "incorrect" for every
  answer (in case someone is deemed having a valid answer if close enough or misspelled something)
- then it moves to the next category question if any; or the game ends if there are no more categories
- when the game is over, the final ranking is shown with a staggering effect

</div>
</details>

Here's a simple version of the game logic:

<iframe src="https://stately.ai/registry/editor/embed/d7244922-258e-435b-b0cc-54458400511d?machineId=632d44f5-b45e-4c8f-a14f-c75a99d182d1" width="100%" height="500px" frameborder="0"></iframe>

With that in mind, the technical requirements are as follows:

1. it should be cheap if not free (don't wanna pay for a whole stack for a one-time event)
2. the backend should hold the whole game logic, the frontend should be dumb and each client should just have their
   state synchronized with the server (this prevents a lot of spaghetti useState)
3. it should receive updates in realtime
4. anyone can join/leave and reconnect at any time
5. the DX should be as smooth as possible (ideally no build time or docker to start) / easy to deploy

One more thing: I wanted to use a state machine (with [**xstate**](https://github.com/statelyai/xstate)) to manage the
game state since it fits well the use-case: a long running session involving multiple
[**actors**](https://stately.ai/docs/actor-model) with a bunch of known **states** and **transitions**.

## Finding the right stack

[Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) seemed to tick a lot of boxes, so I
started reading up on it. I was already familiar with the concept since [sunil](https://twitter.com/threepointone) can't
stop talking about it (I understand why now) and had already used it a bit through PartyKit.

They're cheap on-demand workers that can have access to storage. It's basically Schrödinger servers: both stateful and
serverless.

| Feature     | Stateful                                 | Serverless                           | Stateful Serverless                  |
| ----------- | ---------------------------------------- | ------------------------------------ | ------------------------------------ |
| Persistence | ✅ Maintains state                       | ❌ Stateless                         | ✅ Maintains state (isolated)        |
| Scalability | Manual scaling and resource management   | ✅ Automatic scaling based on demand | ✅ Automatic scaling based on demand |
| Cost        | 💲 Fixed (24/7 server, pay for capacity) | 💲 Usage-based                       | 💲 Usage-based                       |

It's super easy to reason about (just like stateful servers; at least before the deployment phase) while scaling and
remaining cost-effective (serverless). It's maybe not fit for performance-critical use-cases, but this sounds like a
good fit for a lot of use-cases!

What convinced me even further was when I remembered seeing one more package from
[the mad man](https://twitter.com/threepointone), that he recently released on github:
[`partyvite`](https://github.com/threepointone/partyvite).

Upon digging a bit into it, I found 2 gems:

- there's a [Vite plugin for Cloudflare Workers](https://www.npmjs.com/package/@cloudflare/vite-plugin)! (instead of
  having to use [`wrangler`](https://developers.cloudflare.com/workers/wrangler/))
- it also works with Durable Objects (DO), and of course has an integration with PartyKit through
  [`partyserver`](https://github.com/threepointone/partyserver) (it makes working with DO + Websockets a breeze)

This new vite plugin means the whole ecosystem is now unlocked with CF workers, which might just be the game changer
that could make this stack popular in the future.

Oh and regarding deployment, it's as simple as running `pnpm run deploy` with
`"deploy": "rm -rf dist && vite build && wrangler deploy",`, then it's up in ~20s.

The tech stack at this point was made of:

- Cloudflare Durable Objects for hosting, integrated with the vite plugin
- XState for the backend game logic
- PartyKit (through partyserver) for the realtime aspect

## Distributing the actor's state

Since the state machine will live in the backend, I thought of different ways to synchronize each client with the
server-state:

1. I could.. just not use XState at all in the frontend; but I'd lose a bit of type-safety, the niceties of
   `state.matches("...")` and would have to maintain a client state somehow (useState, zustand, @xstate/store etc)
2. I could make a similar state machine in the frontend with mostly empty logic (but with the same states/transitions)
   and start it with the same initial state as the backend, it should work.. but it would hard to maintain (duplicated
   code) and I'm not sure I would handle conflicts (if the client and server state somehow diverge)
3. Or I could do what I do best: end up writing library-code that solves a specific (but tiny) part of the application
   that I was initially working on

## The missing piece: the client façade

I had recently read
[the latest article of the **Speeding up the JavaScript ecosystem**](https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-11/)
(go check it out if you haven't read it yet!) by [Marvin Hagemeister](https://bsky.app/profile/marvinh.dev) and there's
one technique that strucked me because of how smart yet simple it is:

Instead of serializing the whole object from Rust to JS, they made it so that the typings would look like the desired
object was already serialized while the runtime would use a "façade" using a `Proxy` that load the object on demand.

I figured I could do use a similar technique for the client-side state machine. Instead of actually using `createActor`
from `xstate`, I could just replicate the interesting parts of its API and directly send events to the server-side
actor. The only thing I needed to do was to serialize the actor `snapshot` from the backend.

This allows me to maintain a single state machine that can be used by both the frontend (all clients!) and the backend,
without risking a divergence between the two; with typings almost as if the actor lived in the frontend.

I ended up with these typings for the façade:

```ts
export interface ActorFacade<TLogic extends AnyStateMachine, TState extends StateFrom<TLogic> = StateFrom<TLogic>> {
  _userId: string // 👈 this could anything that makes the connection unique
  snapshot: Pick<TState, 'context' | 'value' | 'matches' | 'children' | 'error' | 'status' | 'tags'>
  send: <TEvent extends EventFromLogic<TLogic>>(
    event: TEvent extends ServerOnlyEventInput ? Omit<TEvent, keyof ServerOnlyEventInput> : TEvent,
  ) => void
  sendTo: SendTo<TLogic, TState>
  matches: (state: StateValueFrom<TLogic>) => boolean
  hasTag: (tag: TagsFrom<TLogic>) => boolean
  context: TState['context']
  value: TState['value']
  status: TState['status']
  error: TState['error']
}
```

## Using the façade

See the full code in the [GitHub repo](https://github.com/astahmer/multiplayer-xstate) instead of snippets.

### Client-side

With that, keeping the logic server-side and ensuring that every client always gets the same state become trivial!

Here's a button that can be clicked only if the payment is in the right state and directly sends the event to the
server-side actor:

```tsx
const actor = createActorFacade<PaymentActorType>(snapshot, {
  id: props.paymentId,
  send: (event) =>
    fetch(`/api/payment/send?name=${props.paymentId}`, {
      method: 'POST',
      body: JSON.stringify(event),
    }),
})

const canApprove = actor.matches('Awaiting approval') || actor.matches('Awaiting admin approval')
//                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                  ☝️ type-safe from the backend machine typings

const onApprove = () => actor.send({ type: 'approved' })
//                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                  ☝️ also type-safe

return (
  <Button onClick={onApprove} disabled={!canApprove}>
    Approve Payment
  </Button>
)
```

### Realtime updates from the backend with partyserver

A naive implementation could just send the whole actor snapshot to all clients on each state machine update, something
like:

```ts
import * as Party from 'partyserver'
import { createActor, type AnyActorRef } from 'xstate'
import { nanoid } from 'nanoid'
import { gameMachine } from '../server/game.machine'

interface EnvBindings {
  Machine: DurableObjectNamespace
  ASSETS: Fetcher
}

// we will improve that later on
const encode = (data: unknown) => JSON.stringify(data)
const decode = <T>(data: string) => JSON.parse(data) as T

export default class MachinePartyServer extends Party.Server {
  roomId = nanoid()
  actor = createActor(gameMachine, {
    input: {
      roomId: this.roomId,
    },
  })

  constructor(ctx: DurableObjectState, env: EnvBindings) {
    super(ctx, env)
    this.actor.start()
    this.subscribeToSnapshot()
  }

  subscribeToSnapshot() {
    this.actor.subscribe((snapshot) => {
      const serialized = serializeGameSnapshot(snapshot)
      for (const ws of this.getConnections()) {
        ws.send(encode({ type: 'party.snapshot.update', snapshot: serialized }))
      }
    })
  }

  onMessage(sender: Party.Connection, message: Party.WSMessage): void | Promise<void> {
    const decoded = decode<Record<string, unknown>>(message)
    if (!decoded) {
      console.warn('message is not decodable', message)
      return
    }

    console.log(`connection ${sender.id} sent message: ${JSON.stringify(decoded)}`)

    const eventType = decoded.type
    const isEvent = eventType && typeof eventType === 'string'
    if (!isEvent) {
      console.warn('message is not an event', decoded)
      return
    }

    if (eventType === 'party.snapshot.get') {
      const snapshot = serializeGameSnapshot(this.actor.getSnapshot(), sender.id)
      sender.send(encode({ type: 'party.snapshot.update', snapshot }))
    }

    this.actor.send({ ...decoded, _userId: sender.id } as never)
  }
}
```

In the
[final version of the backend](https://github.com/astahmer/multiplayer-xstate/blob/main/server/game.machine.serialize.ts#L60-L62),
I only send the diffs (using `fast-json-patch` and only if the client hasnt received the update yet).

It's also very simple to hide parts of the state machine context (or any of its child actors), so that a player can only
see his own context and not everyone's.

You just need to serialize the `snapshot` with your own mapper (here it's `serializeGameSnapshot`) and only `pick` the
parts you want to send to the clients based on the current state (use
[`state.matches`](https://stately.ai/docs/states#statematchesstatevalue) !).

## Final result

This is the a tiny demo of how it looked like in the team event (just imagine it smoothly happened with 15+ players):

<video controls>
  <source src="/public/03-blacksoup.mp4" type="video/mp4" />
</video>

## An example without partyserver

As I was writing this article, I figured it would be nice to show how to use the Actor model with Durable Object without
the realtime, so I made a quick example that is instead using persistence (restarting the actor based on the last stored
snapshot) with hono routes.

It's not using `partyserver`, it's just a raw Durable Object, and instead uses polling with a 1s interval (using
tanstack query) to achieve a near-realtime experience.

See the full code: [backend](https://github.com/astahmer/multiplayer-xstate/blob/main/party/xstate-payment.do.ts) and
[frontend](https://github.com/astahmer/multiplayer-xstate/blob/main/src/pages/payment.page.tsx)

See how it behaves with multiple clients:

<video controls>
  <source src="/public/03-payment-dual-window.mp4" type="video/mp4" />
</video>

You can see the state updating each second from the Network tab in the video below:

<video controls>
  <source src="/public/03-payment-workflow.mp4" type="video/mp4" />
</video>

Even if I were to restart the server (simulating the DO shutting down), the payment at this url would still show the
same state since I persist the snapshot on each actor update:

```ts
this.actor.subscribe(async () => {
  await this.state.storage.put('snapshot', this.actor.getPersistedSnapshot())
})
```

Restarting the actor from a persisted state is also super easy:

```ts
const snapshot = await this.state.storage.get<SnapshotFrom<typeof paymentMachine>>('snapshot')
const input = await this.state.storage.get<InputFrom<typeof paymentMachine>>('input')

this.actor = createActor(paymentMachine, { input, snapshot })
this.actor.start()
this.subscribeToSnapshot()
```

## Other DO examples

I made a bunch of PoC to play a bit with Durable Objects:

- [a very basic counter using hono](https://github.com/astahmer/multiplayer-xstate/blob/main/party/hono-counter.do.ts)
- [a classic SSR-only todo list with persistence using hono](https://github.com/astahmer/multiplayer-xstate/blob/main/party/hono-ssr-mpa-react-todolist.do.tsx)
- [a realtime multiplayer state machine using partyserver +
  xstate](https://github.com/astahmer/multiplayer-xstate/blob/main/party/machine.party.ts

## Open source alternative: Rivet

One might argue that investing in Cloudflare Durable Objects might vendor lock you. I'd say it's a totally valid point,
but this might also be explained by the fact that the concept of stateful serverless is still young (I think? it doesnt
seem very popular yet, at least in the JS world) so there arent many alternatives out there.

But I found [Rivet](https://rivet.gg/) a while ago (and had totally forgotten about it until
[after seeing this tweet from sunil](https://x.com/threepointone/status/1903579571028390038)).

I haven't tried Rivet yet, but it looks like a very promising open-source alternative to Cloudflare Durable Objects!

While I was writing this article, [Nathan Flurry](https://twitter.com/NathanFlurry) (the author of
[Rivet](https://rivet.gg/)) did a great job exploring the concept of a standard for stateful serverless servers in his
[blog post](https://rivet.gg/blog/2025-03-23-what-would-a-w3c-standard-look-like-for-stateful-serverless-).

## Conclusion

I'm super happy with the result (the team event went well!), I think Durable Objects (from Cloudflare or elsewhere)
should (will?) gain more traction in the JS world, and I'll definitely be using it in a few more projects. You should
give it a try!

Thanks sunil for the awesome propaganda 🫡
