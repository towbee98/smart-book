const isDevelopment = process.env.NODE_ENV === 'development'

// In development, use local json-server
// In production, use Netlify Functions
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001'
  : '/.netlify/functions'

export const API_ENDPOINTS = {
  stations: `${API_BASE_URL}/stations`,
  timeSlots: `${API_BASE_URL}/timeSlots`,
} as const 