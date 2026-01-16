import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import App from './App.tsx'
import { StationsProvider } from "./contexts/ContextProvider.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StationsProvider>
      <App />
    </StationsProvider>
  </StrictMode>,
)
