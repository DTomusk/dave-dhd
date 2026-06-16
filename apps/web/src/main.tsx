import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import { initTokenStore } from './lib/auth/token-store.ts'
import { localStorageTokenStore } from './lib/auth/token.ts'

// DI for web token store (used for jwt)
initTokenStore(localStorageTokenStore);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme
      accentColor="crimson"
    >
      <App />
      {/* <ThemePanel /> */}
    </Theme>
  </StrictMode>,
)
