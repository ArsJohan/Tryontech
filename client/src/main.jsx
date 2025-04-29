import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppProvider } from './context/AppUserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode> 
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>  
  </StrictMode>

)
