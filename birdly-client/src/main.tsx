import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext.tsx'
import QuizProvider from './contexts/QuizContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuizProvider>
    </AuthProvider>
  </StrictMode>,
)
