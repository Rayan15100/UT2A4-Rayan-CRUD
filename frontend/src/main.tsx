import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// Se elimina el StrictMode para evitar conflictos con findDOMNode en material-table
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)