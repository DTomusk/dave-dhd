# Dev diary 
Here I'm going to write my thoughts for this site as I have them. Please excuse the mess. 

Note: the days below are in reverse chronological order, but the content within each day reads from top to bottom.

## 2026-07-01
### AI 
Yesterday, I learned an important lesson about using AI for developing software. You need to know what you want, and you need to know what's out there. 

I'm quite new to mobile development. I've built a small Android app in Kotlin before, but beyond that, not much. React native is a new landscape for me, so every time I do something, I'm learning lots (and having to learn lots). So, when it came to building reusable UI components, I didn't know much about what's going on in RN world. I asked AI for help building an action menu (the kind you get with vertical ellipses in cards etc.) because I'm working on deleting brain dumps at the moment. It came up with some useful stuff, and I was able to build a sort of menu that would show in the context of a card. The problem was, it was stuck in that context, so you couldn't press outside of the card to close it, and you could also open up multiple menus. Worrying about what I was getting myself into, I asked AI for advice and it gave me a bunch of different suggestions. Because I didn't know the RN landscape or community, I didn't have the context I needed to evaluate the suggestions. It suggested using react native paper which sounded great. It implemented the Material spec, and I'd used Material UI in React before, so I thought it was perfect. But when I looked into it, I realised that the package wasn't being actively maintained. Alright, I thought, I'll try something else, so I looked up different UI libraries. Turns out they weren't being maintained either. So I started looking on forums, like Reddit and GitHub, and turns out the consensus is it's too difficult to maintain component libraries in RN. Due to Android updates, iOS updates, Expo SDK updates, small, open-source teams just can't keep pace. At this point, I was quite frustrated because I'd tried a couple of different packages and run into problems, and I ended up throwing away all the work that I'd done. If I had been more patient, I would've taken a step back and considered my next move better. And, in fact, throwing away all my uncommitted changes and taking the day to think about has allowed me to have a clearer head. I've now decided to build the components myself. My plan is to break the problem down, and go from there. I don't need a fancy set of components with animations, transitions etc. (although that can be added later), what I want is a set of simple components that work. The problem yesterday was that I was starting from the wrong end. I wanted an action menu there and then, but I didn't even know how to open a backdrop that covers the whole screen from any components, and I was getting frustrated that I wasn't getting the action menu done fast enough. This time, I'm going to take it one step at a time and make sure I have something usable after each step. 

What I've learned about software engineering is that anyone can learn to do anything. Earlier in my career, software seemed like a kind of magic, but it is just ones and zeros at the end of the day, and once you're able to abstract a system from its specific use case, you can see a lot more clearly what's actually going on. 

With an action menu, first you need the full screen backdrop. That's going to require a provider, because components are going to need to render things outside of their own context. 

## 2026-06-29
### Errors
The next thing I want to think about is errors. Right now, the way I handle errors is inconsistent. Here's what I'm thinking:

- Repos should return domain errors, otherwise services have to map sql errors, which is a dependency we don't want 
- General purpose errors should be shared so each domain doesn't have to redefine the same error types 
- Handlers shouldn't do any extra error mapping, the service should return domain errors, and there should be an into response method for each error saying what code it has etc. 

I don't want to be too concerned over the "perfect" solution, because there is none, and the changes I would make wouldn't be valuable enough to justify it. I mainly want a pattern to follow (and that I can eventually get AI to follow consistently as well), so I want my project to be consistent enough.

### Repos 
Last night I spent a while thinking about my architecture and, specifically, how I want to handle repos in the future. Being from a C# OOP clean architecture background, my instinct is always to have an abstract repo that a service depends on, and then an implementation in infrastructure that gets registered as the implementation for the service. However, two things are coming up that I needed to start thinking about in terms of repos: 1. soon I'm going to need transactions, and I'm going to want my services to orchestrate transactions, so there are going to be repo methods that don't use the pool that's usually associated with them, and 2. very soon I'm going to want to write unit tests, so I need to think about mocking if I want to have abstract repos. 

I was just in the process of defining a repo trait in brain dumps that the brain dump repo in repos (infrastructure) could implement so the brain dump service didn't have to know about the concrete repo. That in itself was getting annoying because a trait isn't quite the same thing as an interface. As I was doing it, I was thinking about how I would then need to create mock repos for unit testing (or learn a mocking framework), which was another piece of work just to get code that pretends it's done something so that I can validate that my service is doing something. The thing I've always found annoying about mocking in my C# experience is that you have to set up exactly the right data for the right functions for your test cases to pass. This is annoying because you end up essentially maintaining secondary implementations of your interfaces, and if something changes, there are a lot more places you have to make updates. The conclusion that I reached was that mocking would be annoying and defining repo traits was annoying, which led me to ask myself what value I would get from this at all? I don't see this project ever not using postgres, so maybe the concrete repo dependency isn't that bad. I does migrating later difficult, but why should I worry about migrations in the future if I'm trying to build a good system now? Secondly, the other main bonus of abstract repos is the fact that you can mock them for automated testing, but the alternative is using your concrete repos in testing. What I found with my previous Go project and what's apparent in this project is that it's really easy to spin up a test database in Docker and use that for automated testing. So, the solution I've decided to go for is to skip unit tests for service functions that depend on repo functions. There's not much point anyway, because services mainly coordinate, so what's there to test if not the integration? If it's cheap to do, then there's no point why I shouldn't just run integration tests on my services, that way I'll know that new migrations work, that I'm getting the data expected etc. I can still do unit tests, but for stuff that doesn't depend on a live database (like mapping functions e.g.). 

So, that's my decision. Repos will have no state, in which case they can just be a module scoped collection of functions. Service tests will be integration tests for the most part. Services will own the PgPool (or Executor) and decide in what context the repo functions are executed (whether they're in a transaction or not).

## 2026-06-28
### Deleting dumps 
The next thing that has annoyed me is not being able to delete stuff. Because I'm testing with my phone and also trying to use the app on my phone in real life, there's a real mix of data. Now, this isn't what a regular user would be doing, but it's annoying to me, so I'm going to fix it. 

My plan is to use soft deletes, so add a nullable deleted at column to brain dumps. Any queries for brain dumps should have a where deleted at is null. I also want to have one delete endpoint that takes an array of dump ids to delete. I don't see the point in having separate delete one and delete many. We'll have to check that the user is the owner of all the dumps, otherwise we fail the request. This shouldn't be a problem in practice when using the UI as a user will only have access to their dumps, but there should be no way for a user to delete (let alone access) someone else's dumps. Here we can probably use a pretty generic error message if the complete list of dumps doesn't belong to the user, or doesn't exist. And we shouldn't have any partial success for a request, it should be all or nothing (either the user owns all requested dumps or not).

Questions: 
- Should deleted at be on the domain entity? Does the system need to reason about deleted dumps? 
    - I don't know whether or not it "needs to", yet, but I can just add it for now. Now that I've thought about it, it may be good for a future get deleted endpoint so users can see when they deleted what, but I don't think it matters too much. It's a small bit of data that can be added or removed at any time. 
- What happens if a user tries to delete a deleted dump? 
    - Idempotency: users should be allowed to delete a deleted dump, but it will be a no-op 
    - In that case, we shouldn't filter by deleted at is null when checking dumps to delete
- What to do if a request deletes the same dump multiple times? 
    - When executing, get the distinct dump ids in the request 

I've got the main logic for deleting brain dumps working. It's at this point that I start to think, maybe I should have some unit tests? And if I need unit tests, I need to start making my services depend on repo interfaces (which is a good thing long-term).

## 2026-06-26
### App deployment 
Right now, the absolute most important thing for me is to get the app on my phone so I can start using it day-to-day. Until I've done that, I have no evidence of whether the thing I've built is useful or not. 

My plan is to try some pain driven development. I'm not going to actively be planning any development work, rather, I'm going to be building features as things start to annoy me. For example, I can imagine that I'm going to get annoyed at having to sign in all the time, so I could see refresh tokens coming up soon. Or not being able to edit or delete brain dumps. I just want to see what my needs are and address them one at a time. The point is, I need to use the app and build it to be usable. 

Note: for a bit of documentation, 

`eas build -p android --profile preview`

is what I run in order to get a preview build in expo that I can download the apk for (`eas.json` defines the output type). This builds with the environment variables currently included on my machine. I would like to have different env variable profiles for local development and preview builds, but I can look into that later. 

It feels like a strong code smell that because of the expo sdk I use, I've had to drop my overall pnpm version and had to anchor my react versions etc. to a compatible version. I don't think this is the end of the world, but it is a bit annoying. Of course, my website shouldn't have to depend on the version of my expo sdk, they're not related, but because they reference shared packages, expo ends up in charge of everything. And because I like the convenience of expo go, I'm tethered to an older sdk version because the latest expo isn't compatible with expo go yet.

## 2026-06-24
### Brain dump listing 
The last thing to get feature parity between web and app is brain dump listing. 

## 2026-06-22
### Componentisation 
Originally, I had all my styles in one stylesheet in my theme.ts file. Once I started adding more components, I realised that this would quickly become a very long style sheet that would be annoying to work with. So, I've taken a bit of time to create a bunch of really simple components and define their style in the same file as the component themselves. This has meant that I've been able to delete a bunch of stuff from the theme file. That now mainly contains design tokens like colours, but no component specific styles. Which means, if I have a problem with a component, I can easily find both the markdown and the style for it in one place, and I only ever have to change it in one place. My approach is to have style sheets only on the most basic components, and then components which compose a bunch of other components won't have any special styling of their own (unless really necessary). 

### Callout 
I've decided to quickly make some changes to the callout component. It now: 
- Can be dismissed with the close icon 
- Can be set to fade 

But maybe I should be focusing more on the functionality than on these little UI tweaks. Although, it was useful adding the callout for brain dump post errors and success.

### Testing on a real device 
Until now, I've been testing the app in browser just so I can get everything set up quickly and see changes instantly. Now that I'm in a place where I can call the api and post stuff to the database, I've decided it's time to focus on getting this running on a real device so I can start simulating what using it in real life would be like. 

The only real hurdle to this was the .env variable. Before, the api address was localhost, but localhost on mobile refers to the device itself, rather than my laptop where my server is running. So, I just ran `ipconfig` in commandline and replaced localhost with the address there. Now I can connect to my api via my phone, log in and post stuff, which makes me feel quite accomplished. I have my database running in docker, my server is on my laptop talking to the database, and my phone is talking to my server. 

## 2026-06-20
### Node packages 
It's funny how I never really understood node packages until a couple of days ago, and I want to take a moment to consolidate my understanding before moving on to other stuff. 

Basically, any directory with a package.json file is a package. For the package to be useable by another package, it has to export at least something (it also has to have a name). A lock file is a special file that captures all the exact versions of packages that are needed. Running `pnpm install` regenerates the lock file. A lock file can help ensure that there aren't any version conflicts. 

I was running into an issue earlier where my features package was installing react 19.2.7 or something like that, but the native app was using 19.1.0. This meant that when the native app tried calling a hook in the package, there was a version conflict. I've decided to use the react version in the native app as the version of react in the project. This should make it easier to keep versions in sync. The annoying thing is that the native app is on sdk 54 rather than 56 (the current one), which means that the packages aren't quite up-to-date. I decided to go with 54 because that has expo go support, which makes testing a lot easier (I don't have to queue a build in the cloud). Hopefully, newer versions of expo will have expo go support. I find it a bit annoying that they describe the expo go versions as "for educations", because it seems online that there are plenty of real teams that want expo go support. But that's neither here nor there. 

A package manager is responsible for adding and installing packages. Examples include pnpm, npm and yarn. I don't know much about yarn. I used to use npm at work until someone recommended pnpm, and pnpm is what I use now. My understanding is that npm installs each dependency for each package (these are stored in the node modules directory of a package). This can be really inefficient if lots of packages depend on the same packages. pnpm, however, installs only one of each dependency package by doing some kind of magic. 

Anyway, for diagnosing version mismatches in the future, I can always take a look at the actual files in my node modules directories and figure out where the version mismatch is coming from. 

### Expo routing 
Now that my registration form works and logs you in, it's time to start building out more of the site to get parity with web. Expo uses file-based routing (a bit like next.js), so files and directories define the route tree. Layout files (_layout.tsx) aren't routes in and of themselves, but rather define a layout for a route group. For example, I've created a (protected) route group, and the layout for that checks whether a user is authenticated and reroutes them if they aren't. The root layout file defines the app initialisation (like App.tsx in react). This is where DI etc. is done. For example, this is where the local storage and api endpoints are injected in this project and the providers are set up.

### UI design 
There's a lot that I need to learn about react native apps, so I can't expect that I'll build this app super quickly. I should, however, take this learning time to ask questions as and when they pop up so I don't end up writing code that I don't understand and that doesn't scale well. 

For SafeAreaView and KeyboardAvoidingView, these should be applied on a case-by-case basis. It's not a lot of code to wrap a component in them, and that gives you more fine-grained control over the layout. Applying them globally means less available area in general and less flexibility. Case-by-case means I can experiment with omitting them without affecting how anything else looks. 

## 2026-06-17: 
### Native parity 
I've now extracted everything I can from the vite react site into a shared packages workspace so that the upcoming react native app can reference it as well. What I want to do now is to reach feature parity across the app and the site, but that's going to take a little bit of doing and I won't see the results until after some work. This is compounded by the fact that I've never made a react native app before, so all of this is new to me, although I imagine it will be quite straightforward because it's still react, it's more about how I translate UI components than anything else. 

To start with, I'm going to build the registration form in the index file with no wiring. Then I can do a couple of things: componentise elements (including the form so it can be reused for login), wire up API, add styling. I also would like to extract strings at some point, because the app and the site should show the exact same string content (at least in most cases I imagine).

Dependency installs should be done using pnpm in the repo root, not anywhere else. `--filter` can be used to specify whether something's for native or web. I was using npm in the native app, but I don't want to do that. I want to keep everything consistently pnpm, so I should manage everything via the root and not install things inside the packages themselves. 

## 2026-06-16:
### pnpm workspaces
I want to write about this now because I'm afraid I'm going to forget about it and it took some figuring out. 

What I'm working on at the moment is splitting out any non-react specific stuff in the web into a separate package that can eventually be referenced by the react native app. The idea is that these two apps should depend on the same code as much as possible, although I'm not fussed if they don't look exactly the same. Things like hooks, apis, types etc. should all be identical, and pnpm workspaces is a way to make that happen. 

At the very root of the project I've added a package.json file. This means the entire repo is a package. The package.json file is very minimal. Firstly, it sets the package to private. Secondly, it defines a couple of useful scripts (for running the web and the app). Otherwise, it contains some other less important metadata. 

The important new file is pnpm-workspace.yaml. This defines what packages are in the workspace. We've put apps/* and packages/*. This means that any packages in those two directories are included in the workspace. server has been left out because it only contains rust server code. 

At the point of writing, I've created two packages in `./packages`. For now, they mirror the structure that they had in web. I might keep it like this, but it might be better to restructure later down the line. I've done it like this for now because I believe in just making one decision at a time, otherwise things become complicated, overwhelming and hard to track. All I wanted was a proof of concept that I could import one thing from a private package I'd defined myself in my monorepo. 

So, each directory in packages includes a package.json file which defines everything that package exports as well as the package name. That's how we determine what to reference when importing the package in web. However, to import a package like this, we also have to add it as a dependency in the web's package.json. 

### Native form
I'm very excited because I'm starting to get the hang of react native development (or at least so I think, I know there's a lot more for me to learn). I've successfully implemented the same registration form I have in the web using RHF in native. Currently, all it does is log that the form has been submitted, but that's good enough for me now. I've created a components directory that is broken down into a couple of other folders. Basically, it seems I'm ready to wire up some more stuff, including the API and token storage. 

### API
I'm ready to start calling the api from my native app. The bootstrapping is pretty much identical to the web, I just need to initialise my query client and token store differently because they're platform dependent. 

## 2026-06-14:
### More UI 
Want to do some validation. Let's break it down. 

[x] API validation for length (min and max, min excluding whitespace).

To keep in mind for API validation: need to call validate method in handler, otherwise no validation applied. Need to import validate both in handler and dto. Can define custom validation functions and reference by name.

Need to return specific error responses with error codes in handler function, otherwise errors are returned as 200s. 

Quickly figure out best way to clear input in homepage form. Oh wait, that's really easy, just set content to empty. 

Now want to add client-side validation for dumps that match api. 

## 2026-06-13:
### Brain dump UI 
Now that the auth stuff is done and merged in and there is a UI, I can start working on wiring up the brain dump endpoints to the frontend. There are quite a few things that need doing, and if I think about it too much I'm going to get overwhelmed. I just need to pick something and start with that. 

I've made an incredibly bare-bones solution to start with. The home page has a button that creates brain dumps. They have the same text all the time (because there's no text field yet). The next things I need to do are: 
- [x] Have a text field for entering brain dumps 
- [x] Clearing the cache on post so that the first page of brain dumps is refetched
- [x] A component for displaying brain dumps (including the text and the date created, I don't think I need anything else right now)
- Componentise everything 
- Create a pagingated page for viewing all brain dumps (no sorting or ordering or filtering at the moment)
- Figure out width of home page content
- Add min and max length

Let's start from the very beginning, a very good place to start. Need to look into radix docs for text fields. Sorry, it should be a text area, not field. 

I've now wired in a text area and invalidated dumps on post so it refetches. 

Programming often stresses me out because I get overwhelmed by the amount of things I need to do. I think the reason for that is because I'm in a rush to get stuff done. In my mind, I want to deliver a feature by a certain time, but the more I think about it, the more things there are to get done, and that quickly becomes stressful. The way I've managed to learn the languages I have is by not worrying about how much there is to learn, but simply to enjoy the process. The brain dump UI might seem like a simple thing in my mind, but there's still a lot to it, and if I let myself think about just how many things there are, then I'll get overwhelmed. I need to just take it one thing at a time and not worry about delivering by a certain date. This isn't work, there are no deadlines, and trying to stick to a deadline is not going to make me go any faster. Quick the contrary really. I just need to work consistently, and eventually I'll have something I can be proud of because I do value producing quality work. When I look at my other projects, I'm impressed by how much I achieved. Even if at the time I didn't think much of what I was doing or was disappointed at my pace. Really, I just need to let myself work and not get in the way of myself. Things will get done when they get done as long as I keep doing things. And, especially in programming, things will inevitably come up that I didn't plan for. Part of that is experience, the more I do stuff, the more I know what to expect, but part of that is just the nature of software. Nothing is ever super easy because everything is endlessly configurable. 

## 2026-06-12:
### Frontend loose ends
There are a couple of things that I've had to do that I haven't documented too well. The frontend is starting to look good, or at least usable. Part of me thinks that radix themes was the wrong choice because it's just a bit boring, but I'm sure I can live with it and I have to remind myself that I want to get the UI done as quickly as possible. The registration pages are done, the auth form has been centralised so it's the same for both pages, and I've added a callout element which is just a wrapper on the radix callout (means if I get tired of radix it'll be easy to replace). I also have a minimal nav and some other stuff, idk. 

Next, I want to merge this, get it on vercel, get it deployed along with the server and test it out in the cloud. 

I can now register and log into the site in a deployed environment, whoopie! 

I will definitely need refresh tokens relatively soon, but I kind of don't want to do it until it's become really annoying for me without it. 

## 2026-06-11:
### CORS
I've just added a powershell script to run the frontend and server with hot reloads. Now that I have api functions to call the server, I can work on getting the two to work together. The first thing I need to do is to set up CORS allowed origins and methods. While I've been able to get away with calling the API directly via Swagger, I now need the API to define what origins can call it and how. 

Setting up CORS was actually really easy with tower_http (although I don't think it's ever particularly hard). I added an allowed origins var to .env, got config to parse that into a Vec<String> of allowed origins, and then used that in app to set up the CORS layer. Hopefully, if I run my frontend and server locally and try out the register request, it will succeed.

It worked! I forgot to add allow_credentials, but once I did I managed to submit a registration request and the API returned a JWT. The next step, then, is to build out the auth provider and make sure the site can keep track of the user being logged in. 

## 2026-06-10:
### RHF
I had to take a step back today because I realised I kept getting frustrated with the form I was building, and the reason was that I was trying to do too many things at once. I was trying to build a form that was broken down into a page, a form component, and a set of input components while using rhf and zod. Because I didn't know exactly how to execute all these ideas at once, I kept getting frustrated trying to figure out and solve the next issue. 

So, instead, I took a pause and created a new repo just for practising building forms. I started with an incredibly simple form, just a text input and submit button with no rules, validation, or submit behaviour. I then built on top of that to include multiple inputs with various validation requirements, extracted input fields and introduced a UI library (Radix themes as well). By taking a step back and breaking the problem down, I was able to figure out how things fit together faster, and now I have a pattern that I can build on in this project.

I've also decided to scrap zod for now because it isn't providing any real value at the moment. My forms are incredibly simple, and another dependency just adds extra complexity without much value. 

Going forward, I'm going to try to not componentise until a reason presents itself. If I only ever do something once, then there's not much of a reason to make it reusable. I'm going to try to be pragmatic. As soon as there is a second use case, I will componentise so there's only ever one implementation. 

### Integrating the front and back ends 
A couple of years ago, when I was still at Uni, I took part in a hackathon with my friends. None of us had really programmed before (that's not super true, I definitely had) and we decided to make a web app and a browser extension to recommend online shoppers more carbon friendly versions of the items they were browsing. One thing we realised during those 24 hours was that no one knew how to get the frontend to talk to the backend and vice-versa. So, in the end we ended up with a separate frontend and backend that we demoed separately. It was during that demo that I decided I was going to figure out how to integrate a front and back end. 

And lo and behold, here we are today and I've managed to get several front and back ends talking to each other. Feels good. And that's what I'm planning on doing today. 

When working on my react projects, I almost exclusively use TanStack query for handling caching, loading, refetching, invalidation etc. 

Step 1: add query provider. This wraps the app so tanstack methods can be called anywhere and they have a shared cache etc. 

Step 2: add fetch method. For now, I'm sticking to fetch for calling my API. I don't know much about it, I think axios is an alternative, but honestly fetch seems to get the job done. I've mainly copied over a function from a previous project and refactored it to split up what each part of the function does (constructing headers, constructing the body, calling fetch, and handling responses). This will be the query function in my hooks.

## 2026-06-09:
### Component library 
There are a lot of react component libraries out there. The main thing is that I don't want to build components that have already been built a thousand times and better than I would. I want to focus on solving the problems my site solves. 

I think I'll go with radix themes. The choice is kind of arbitrary, especially since I haven't tried out that many component libraries so I don't know what the strengths and weaknesses of different ones are, or what I value in a component library. Both radix themes and shadcn/ui are built on radix primitives, but themes is more opinionated than shadcn. Shadcn basically copies code into your repo that you have control over, which is not what I want. Radix themes very much seems like the good enough, low effort solution that I want.

Start by running `pnpm add @radix-ui/themes`, then import the radix css file and wrap the app in the radix theme provider. I've wrapped the text in the home page in `Text` from radix and run dev and that looks to have worked. 

Once I've gotten to the point where auth works on the frontend, I should go back to my template project and basically implement the exact same stuff there. That's another one of those tasks that's a bit tedious to set up and probably won't change much between projects. There are also a couple of other things that I should do in the template that will make next time easier, such as setting sqlx to use offline mode. 

### Auth form 
It's annoying building out a frontend at the start because there are so many different components to think of, not just in the sense of how things look and behave, but what you want to inject and generalise. My thinking is to first build one component that will be the registration form. Then, I want to extract anything reusable, e.g. form fields, card, layouts etc. Later I'll want to make the form itself generic so it can be used for either login or registration, and the page will control which one it is and which api hooks get called. 

## 2026-06-08: 
### Brain dump
The first real use case is a simple brain dump. By that I mean a place where you can write something down and just forget about it. For me, I don't like using normal list apps or pen and paper because it's not simple to just write a thing down. You have to organise the list then and there, or you have to find your spot in your notebook. My intention with the brain dump is to make it as simple as possible to write a random thought down and then leave categorising and organising it til later. In fact, just this past weekend there were at least a dozen times when I would've found a simple brain dump useful. 

Thankfully, because the use case is extremely simple, so is the implementation (for now). I just want an endpoint where I can post brain dumps, which are just a piece of text (a UUID and timestamp are generated by the service and then associated with the calling user). I'm not interested in updates or deletes just yet. In the future, I would like to be able to organise, categorise, prioritise, etc. brain dumps to produce to-do lists, habitual tasks and so on, but I kind of don't want to think about that just yet. 

### sqlx type checking
This is something that's very exciting for me because it was a real bug bear of mine when I was working with postgres in Go (I'm sure there might have been solutions for it, I just hadn't really looked). sqlx has strong type checking. This means that queries are checked against the actual state of a database to ensure that the types match up. I was running into a problem earlier because I had a nullable timestampz in my migration, but my struct was using an OffsetDateTime (not optional), and sqlx couldn't convert between the two. However, after I added a migration and ran my migration binary, the error disappeared. This will give me a lot more confidence with my sql queries, and I should look into this for Go when I go back to working on FoodSmash. I prefer writing sql rather than using ORMs because I like being in control and seeing what it's actually doing, but type checking has been a really annoying problem in the past (especially at work).

One thing that I ought to mention (because it was frustrating and difficult to work out) is how sql type checking interacts with fly deployments. Basically, sqlx does type checking in one of two ways: 1. using a live database at compile time by reading the environment variable DATABASE_URL and 2. using "offline" mode, which is set with the environment variable `SQLX_OFFLINE=true` and basically means that the compiler checks queries in a `.sqlx` folder to do its type checking, rather than the state of a specific database. This folder is generated by the `sqlx cli` by running `cargo sqlx prepare`. This basically checks all the `query!` and `query_as!` macros and generates an associated .json file with all the details of that query that the compiler can then check in offline mode. 

I was having a tough time figuring this out because there are a couple of moving parts and then error messages I was getting were a bit opaque. The solution for my fly deployment (`fly deploy`) was to modify my server `Dockerfile` to also copy the .sqlx directory. 

The other thing that was annoying was that I couldn't run `cargo run --bin migrate` for the longest time to migrate my deployed database because the binary wouldn't compile due to the type checking issues. This turned out to be because I wasn't running offline mode, so sqlx was checking my actual db (that I was trying to migrate, i.e. that didn't have the right tables) and failing because of the mismatch. The solution here ended up being setting `SQLX_OFFLINE=true` in .env as well. 

The start of a project is always the most annoying bit because there is so much infrastructure to be built and so many patterns to be established. While it was definitely useful setting up the template project beforehand, there was still a bunch of stuff that I needed to do, so it would be good for me to go back to the template and update those things as well. Also, it was very annoying figuring out how to get query params to work properly with utoipa, but I eventually figured that one out as well. 

### Frontend
I am not the biggest fan of frontend development. Having to design for lots of different browsers and view ports doesn't appeal to me, and I don't always have a strong vision for how I want my site to look. On the other hand, I'm constantly coming up with ideas for apps and websites to solve specific problems. With that in mind, I think it's important that I cut out as much excess work as possible and focus on developing my abilities in my main areas of interest. In my previous project (FoodSmash, which I will go back to once this site is more stable), I went down the fully custom tailwind route. I think that was a mistake. This time I'm going to choose a react component library that looks good enough and stick with it. I think it's rare that you go to a truly exceptional website (in terms of UI), and that is certainly not my goal here. My goal is to solve a specific problem for myself and I'm not going to worry too much about how the actual site looks.

To start with, I've run `pnpm create vite@latest` and chosen react with typescript compiler. I much prefer typescript to vanilla javascript much in the same way I prefer Rust and C# to Python. 

Step 2 is gutting the template. That means removing all assets, .css files, app content etc. Come to think of it, I should make my own template, because I almost always use TanStack query, RHF, react router etc. and it's a pain to go through that whole boilerplate process at the start of every project. 

Step 3: set up routing. I am tempted to just copy the FoodSmash app structure because I think that worked pretty well. For routing, that means setting up a router using `react-router-dom` with one route (the index route). This route renders the `HomePage`. The router is set in the router provider in `App.tsx`. The `AppLayout` wraps every route in the router, so this will control the common layout for all pages (other layouts can be added later to children).

I like how each top level folder in `src` has a specific purpose: 
- app: handles wiring, routing and providers, i.e. everything that's common to all parts of the site 
- layout: handles how components are laid out
- pages: each handles orchestrating logic and components for a specific page

Soon we'll have `components` for storing shared components and `features` for feature-specific hooks and components. Without experience, you don't know what problems you'll need to solve. Just over this past year, I've done so much hobby programming on similar projects (web apps), and the difference between my understanding between then and now is startling. A year ago, I'd never really made a web site from scratch. I'd done lots of work in my job on specific pages and components, but I'd never chosen component libraries, wired up routes, designed architecture etc. It really feels like I've learned a lot over the last year. I've also learned a great deal from work, but I feel like I've learned very different things because the problem spaces are so different. At work you coordinate with dozens of other people, you have different requirements, different constraints, you have to keep the lights on, there are deadlines and tradeoffs you have to consider and you're often working on code that you've never seen before and isn't how you would've written it. The requirements for personal projects are very different, and the you have to make very different decisions. Being a single developer, you need to figure out what matters to you because you're time is so limited in comparison to an established company. Things won't be perfect, but you can get a lot done most of the way. 

The other thing to consider is AI. I find AI incredibly useful for certain things, and indeed some times it's so useful that you barely need a developer there. At the same time, part of my aim with these personal projects is to learn to write scalable applications, what works, what doesn't, what things need to be considered, how to diagnose an issue. Much in the same way that I could get ChatGPT to generate an essay in Hindi and it may be a perfectly convincing piece of text, I won't be able to read it, and I won't have learned anything by prompting ChatGPT to do that. I could use a lot more AI than I am for my projects, and I would get stuff done faster, but that's not what I want. At the end of the day, I want to come up with my own ideas and always try to write code myself. I'm mainly using AI as a learning tool and for getting feedback on the stuff I've written so I can improve my instincts for next time. 

## 2026-06-05: First steps 
Before making this repo, I made a small rust server template repo. The template has a server with docker, postgres, migrations and a simple jwt auth implementation. I realised the most annoying thing about starting a new project was having to write the boilerplate needed to set things up before doing actual feature work, so hopefully that should help. I'm also planning to build a language learning app, and I would like to use the same template there, so it's already theoretically paying off. 

The first thing I want to do with this repo (besides writing my thoughts down) is to get the server deployed. I always wait too long before starting on deployment and I always run into really annoying issues when I do because the solution I built wasn't suitable for being deployed. So, my plan this time around is to get it deployed ASAP and maybe continuously integrate and continuously deploy... maybe 👉👈

I've used fly.io before. It's really cheap and easy to set up, so I'll do the same here. I could learn to self host as all the linux hipsters are doing these days, or I could pay for a bunch of Jeff tokens to put this up on AWS and have all I need in one place, but at the moment I can't be bothered to do either of those. I lead a very frugal lifestyle, and if I have to have separate services for deployment, db, redis, frontend hosting, blob storage etc. to minimise the cost to me, then that's what I'm going to do. 

I'm also going to need a postgres database. I've used supabase before so I'll do that again. They have a good free tier. 

I've just run `fly launch` to create the `fly.toml` for my server deployment. That has automatically detected my Dockerfile and is now building the image. After adding the necessary secrets, the server is now running and has successfully connected to the database.

Now to run migrations on the database. I can do that by running the migrate binary locally with my connection string. After running migrations, I can call the register endpoint through swagger and successfully get a JWT back. I can then use the same credentials to log in and get a new JWT, and then call the protected endpoint with my bearer token set. 