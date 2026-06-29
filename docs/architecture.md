# Architecture
Vertical slice crates (e.g. `auth` and `brain_dump`). Each crate contains handlers, routers, dtos, services etc. Layered architecture where outer layers depend on inner layers (and not vice-versa). 

# Router: 
Defines routes for crate. Maps routes to handlers. 

# Handler: 
Transport layer. Handler functions receive requests, validate (without state, i.e. no repo calls), transform requests into commands, call services with commands, and return responses. 

A handler usually: 
- Validates a request against rules that don't depend on other data, e.g. data types are correct, size limits are maintained, etc. 
- Maps a request object (dto) to a domain entity (model)
- Calls a service method with the command 
- Maps service response to a response dto 

# DTO:
Objects for requests and responses. Transport detail, and functions to map to commands (outer layers depend on inner layers and not vice-versa)

# Service: 
Orchestrate use cases. Take in commands and return data. This is the innermost layer, so as few dependencies as possible and as close to pure business logic as possible. Services depend on concrete repos at the moment, but these can be decoupled in the future once necessary.  

# Model: 
Domain models. Services reason about models. Again, as few dependencies as possible.

# Repo: 
Data persistence. These receive and return models and domain errors (again, so services don't have to know about persistence details). Repos are stateless. In fact, they are just collections of functions that receive an Executor, so they don't get initialised or injected into services. Repos are mainly grouped together for organisational purposes.