Start-Process cmd -ArgumentList '/k', 'cd apps && cd web && pnpm run dev'

Start-Process cmd -ArgumentList '/k', 'cd server && cargo watch -x "run --bin server"'