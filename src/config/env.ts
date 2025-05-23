const isDevelopment = process.env.NODE_ENV === 'development'

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'
  : process.env.VITE_API_BASE_URL || 'https://your-production-api-url.com'

export const API_ENDPOINTS = {
  stations: `${API_BASE_URL}/stations`,
  timeSlots: `${API_BASE_URL}/timeSlots`,
} as const 