# Dev diary 
Here I'm going to write my thoughts for this site as I have them. Please excuse the mess. 

Note: the days below are in reverse chronological order, but the content within each day reads from top to bottom.

## 2026-06-13:
### Brain dump UI 
Now that the auth stuff is done and merged in and there is a UI, I can start working on wiring up the brain dump endpoints to the frontend. There are quite a few things that need doing, and if I think about it too much I'm going to get overwhelmed. I just need to pick something and start with that. 

I've made an incredibly bare-bones solution to start with. The home page has a button that creates brain dumps. They have the same text all the time (because there's no text field yet). The next things I need to do are: 
- [x] Have a text field for entering brain dumps 
- [x] Clearing the cache on post so that the first page of brain dumps is refetched
- A component for displaying brain dumps (including the text and the date created, I don't think I need anything else right now)
- Componentise everything 
- Create a pagingated page for viewing all brain dumps (no sorting or ordering or filtering at the moment)
- Figure out width of home page content
- Add min and max length

Let's start from the very beginning, a very good place to start. Need to look into radix docs for text fields. Sorry, it should be a text area, not field. 

I've now wired in a text area and invalidated dumps on post so it refetches. 

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