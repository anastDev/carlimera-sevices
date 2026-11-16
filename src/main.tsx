import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

window.addEventListener("error", (event) => {
    alert(`Error: ${event.message}\n${event.filename}:${event.lineno}`);
});
window.addEventListener("unhandledrejection", (event) => {
    alert(`Error: ${String(event.reason?.message ?? event.reason)}`);
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <App />
  </StrictMode>,
)
