import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import { initTokenStore } from '@davedhd/lib/auth/token-store'
import { initApiClient } from '@davedhd/lib/api/client'
import { localStorageTokenStore } from './lib/auth/token.ts'

// DI for web token store (used for jwt)
initTokenStore(localStorageTokenStore);
initApiClient(import.meta.env.VITE_API_BASE_URL);

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
