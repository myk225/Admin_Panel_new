import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/global.scss'
import { AuthContext } from './contexts/authContext/authContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContext>
    <App />
    </AuthContext>
  </React.StrictMode>,
)
