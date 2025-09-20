import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rotas from './routes/Rotas.jsx' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Rotas />
    </QueryClientProvider>
  </StrictMode>,
)
