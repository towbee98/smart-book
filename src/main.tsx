import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BookingProvider } from './context/BookingContext'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  console.log('Starting MSW worker...')
  const { worker } = await import('./mock/server')
  await worker.start({
    onUnhandledRequest: 'bypass',
  })
  console.log('MSW worker started')
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BookingProvider>
        <App />
      </BookingProvider>
    </React.StrictMode>,
  )
})
