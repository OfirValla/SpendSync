import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Disable logs in production
if (process.env.NODE_ENV === 'production') {
    console.group = () => { };
    console.groupEnd = () => { };
    console.groupCollapsed = () => { };
    console.log = () => { };
    console.error = () => { };
    console.debug = () => { };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
