import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// Punto de entrada principal. Envolvemos toda la aplicación con Redux (Provider) y las rutas (BrowserRouter)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)