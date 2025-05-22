import { setupWorker } from 'msw/browser'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/test', () => {
    return HttpResponse.json({ message: 'Test successful' })
  })
]

export const worker = setupWorker(...handlers) 