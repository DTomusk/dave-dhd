# Backlog 

## In progress 

- [ ] Brain dump (API)
    - Priority: high 
    - Area: 
    - Type: feature
    - Why: core use case of the site, store and retrieve the random thoughts that people (particularly those with ADHD) have throughout the day
    - DoD: 
        - POST: authenticated user can post a piece of text through an endpoint 
        - GET: authenticated user can retrieve a paginated list of their brain dumps ordered by descending date time 
            - Pagination is offset based rather than cursor based (known quantity of brain dumps per user and few updates)
        - Unauthenticated users cannot access anyone's brain dumps 
        - A given user can only access their own and no one else's brain dumps

## Planning

- [ ] Initial GUI with sign in flow
    - Priority: high
    - Area: frontend
    - Type: feature
    - Why: GUI much more practical than command line curl or swagger UI for accessing API data 
    - DoD: 
        - React project set up 
        - Component library decided on 
        - Login and registration pages created 
        - Site deployed to vercel 
        - Site can call API endpoints 
        - Site can store JWT in js memory (e.g. useState) and send bearer token in API request 

- [ ] Brain dump (UI)
    - Priority: high
    - Area: frontend
    - Type: feature
    - Why: this, ideally, should've been done as part of a vertical slice with the backend work, but it doesn't matter too  much at this stage. The user needs to be able to post and access their brain dumps from the site
    - DoD: 
        - Restricted routes implemented (brain dumps page)
        - Brain dump input conditionally displayed based on auth status 
        - Brain dump page retrieves user's brain dumps (paginated)

## Item template 

- [ ] Item name
    - Priority: 
    - Area: 
    - Type: (bug, tech debt, feature)
    - Why: 
    - DoD: 

## Done