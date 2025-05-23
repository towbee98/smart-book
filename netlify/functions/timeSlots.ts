import { Handler } from '@netlify/functions'
import timeSlotsData from '../../db.json'

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Enable CORS
    },
    body: JSON.stringify(timeSlotsData.timeSlots),
  }
} 