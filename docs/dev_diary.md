# Dev diary 
Here I'm going to write my thoughts for this site as I have them. Please excuse the mess. 

## 2026-06-05: First steps 
Before making this repo, I made a small rust server template repo. The template has a server with docker, postgres, migrations and a simple jwt auth implementation. I realised the most annoying thing about starting a new project was having to write the boilerplate needed to set things up before doing actual feature work, so hopefully that should help. I'm also planning to build a language learning app, and I would like to use the same template there, so it's already theoretically paying off. 

The first thing I want to do with this repo (besides writing my thoughts down) is to get the server deployed. I always wait too long before starting on deployment and I always run into really annoying issues when I do because the solution I built wasn't suitable for being deployed. So, my plan this time around is to get it deployed ASAP and maybe continuously integrate and continuously deploy... maybe 👉👈

I've used fly.io before. It's really cheap and easy to set up, so I'll do the same here. I could learn to self host as all the linux hipsters are doing these days, or I could pay for a bunch of Jeff tokens to put this up on AWS and have all I need in one place, but at the moment I can't be bothered to do either of those. I lead a very frugal lifestyle, and if I have to have separate services for deployment, db, redis, frontend hosting, blob storage etc. to minimise the cost to me, then that's what I'm going to do. 

I'm also going to need a postgres database. I've used supabase before so I'll do that again. They have a good free tier. 

I've just run `fly launch` to create the `fly.toml` for my server deployment. That has automatically detected my Dockerfile and is now building the image. After adding the necessary secrets, the server is now running and has successfully connected to the database.

Now to run migrations on the database. I can do that by running the migrate binary locally with my connection string.