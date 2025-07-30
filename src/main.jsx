import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './router/Router.jsx'
import { AuthProviver } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviver>

      <Router />
    </AuthProviver>
  </StrictMode>,
)
