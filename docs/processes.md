# Processes 
Reference for scripts that need to be run for deployments, migrations etc. (these could be turned into script files soon).

## Database migrations
TODO: This process could be improved

1. Add a migration file with the next number up in `.\server\migrations`
2. Run `cargo sqlx prepare` in `.\server`
3. Run `cargo run --bin migrate` in `.\server`, this migrates the database with the connection string in `.env`

Note: run migrations before modifying any queries

## Swagger 
Swagger updates automatically when you build (you don't have to run a separate command to generate swagger docs). What you do have to do, however, is document each route function in the handlers, and then register endpoints in `openapi.rs`. 

## Scripts for running locally
Run these from the project root:

Server: `cd server && cargo watch -x "run --bin server`
Web: `pnpm run dev:web`
Native app: `pnpm run dev:native`

These all do hot reloads. 

## Deployment 
### Server
Run `fly deploy` from `.\server`.

### Web
This is handled automatically by Vercel on every push (probably should be modified)

### Native app
Run `eas build -p android --profile preview` from `.\apps\native` (because that's where the eas and app files are). This will trigger a preview build in eas. The 

## Automated testing
### Server 
We use `cargo test` in `.\server` to run automated tests. 

You can run tests for specific files like so: `cargo test brain_dump::dto`

You can also run the tests in the file itself in VS Code. 