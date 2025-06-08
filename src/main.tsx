/**
 * * @file main.tsx
 * * @description Entry point for the React application. It renders the main App component
 * * into the root element of the HTML document.
 * @author Chuka <kalchuka@gmail.com>
 * 
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
