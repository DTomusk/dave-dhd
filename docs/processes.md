# Processes 
Reference for scripts that need to be run for deployments, migrations etc. (these could be turned into script files soon).

## Database migrations
TODO: This process could be improved

1. Add a migration file with the next number up in `.\server\migrations`
2. Run `cargo sqlx prepare` in `.\server`
3. Run `cargo run --bin migrate` in `.\server`, this migrates the database with the connection string in `.env`

Note: run migrations before modifying any queries

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