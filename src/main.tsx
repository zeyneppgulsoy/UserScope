
import { createRoot } from 'react-dom/client'
import { RouterProvider, } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { router } from './Routes'




createRoot(document.getElementById('root')!).render(
  
    <RouterProvider router={router} />
  
)
