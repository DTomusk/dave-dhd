# Backlog 

## In progress 

- [ ] Brain dump (UI)
    - Priority: high
    - Area: frontend
    - Type: feature
    - Why: this, ideally, should've been done as part of a vertical slice with the backend work, but it doesn't matter too  much at this stage. The user needs to be able to post and access their brain dumps from the site
    - DoD: 
        - [x] Restricted routes implemented (brain dumps page)
        - [ ] Brain dump input conditionally displayed based on auth status 
        - [ ] Brain dump page retrieves user's brain dumps (paginated)

## Planning 

## Item template 

- [ ] Item name
    - Priority: 
    - Area: 
    - Type: (bug, tech debt, feature)
    - Why: 
    - DoD: 

## Done

- [x] Initial GUI with sign in flow
    - Priority: high
    - Area: frontend
    - Type: feature
    - Why: GUI much more practical than command line curl or swagger UI for accessing API data 
    - DoD: 
        - [x] React project set up 
        - [x]Component library decided on 
        - [x] Login and registration pages created 
        - [x] Site deployed to vercel 
        - [x] Site can call API endpoints 
        - [x] Site can store JWT in local storage and send bearer token in API request

- [x] Brain dump (API)
    - Priority: high 
    - Area: 
    - Type: feature
    - Why: core use case of the site, store and retrieve the random thoughts that people (particularly those with ADHD) have throughout the day
    - DoD: 
        - [x] POST: authenticated user can post a piece of text through an endpoint 
        - [x] GET: authenticated user can retrieve a paginated list of their brain dumps ordered by descending date time 
            - [x] Pagination is offset based rather than cursor based (known quantity of brain dumps per user and few updates)
        - [x] Unauthenticated users cannot access anyone's brain dumps 
        - [x] A given user can only access their own and no one else's brain dumps
        - [x] Updates have been deployed to fly.io and tested