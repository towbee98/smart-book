import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BookingProvider } from './context/BookingContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>,
)
