Start-Process cmd -ArgumentList '/k', 'cd frontend && pnpm run dev'

Start-Process cmd -ArgumentList '/k', 'cd server && cargo watch -x "run --bin server"'