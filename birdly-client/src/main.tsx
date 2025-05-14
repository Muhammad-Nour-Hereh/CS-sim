import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Contexts from './contexts/Contexts.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Contexts>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Contexts>
  </StrictMode>,
)
