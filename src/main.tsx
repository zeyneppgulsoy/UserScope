import { createRoot } from 'react-dom/client'
import { RouterProvider, } from 'react-router-dom'
import './index.css'
import { router } from './Routes'
import { ThemeProvider } from './components/theme-provider'




createRoot(document.getElementById('root')!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem suppressHydrationWarning storageKey="theme">
    <RouterProvider router={router} />
  </ThemeProvider>
)
