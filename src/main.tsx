import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import store from './store'; // Importez votre store ici
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/* Le Provider permet à toute l'application d'accéder au store Redux */}
      <Provider store={store}>
          <Toaster richColors position="top-center" />

          <App />
      </Provider>
  </StrictMode>,
)
