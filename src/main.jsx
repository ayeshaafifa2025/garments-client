import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './contexts/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
import ThemeProvider from './contexts/ThemeProvider.jsx'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
     <HelmetProvider>
       <ThemeProvider>
      <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </AuthProvider>
    </ThemeProvider>
 </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)
