import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AgentX from './agentx.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AgentX />
  </StrictMode>
)