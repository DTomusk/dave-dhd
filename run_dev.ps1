Start-Process cmd -ArgumentList '/k', 'pnpm run dev:web'

Start-Process cmd -ArgumentList '/k', 'cd server && cargo watch -x "run --bin server"'