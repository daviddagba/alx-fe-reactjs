import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css' // optional — Vite template generates this; create if you want styles


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<App />
</React.StrictMode>
)