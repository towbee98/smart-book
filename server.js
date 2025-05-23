const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// API Routes
app.get('/api/stations', (req, res) => {
  res.json([
    {
      id: "1",
      name: "Downtown Auto Care",
      carTypes: ["sedan", "suv"],
      services: ["wash", "detailing"],
      location: "123 Main St",
      rating: 4.5
    },
    {
      id: "2",
      name: "Westside Service Center",
      carTypes: ["sedan", "suv", "truck"],
      services: ["wash", "detailing", "maintenance"],
      location: "456 West Ave",
      rating: 4.2
    },
    {
      id: "3",
      name: "East End Garage",
      carTypes: ["sedan", "van"],
      services: ["wash", "maintenance", "repair"],
      location: "789 East Blvd",
      rating: 4.8
    }
  ])
})

app.get('/api/timeSlots', (req, res) => {
  res.json({
    "1": [
      {
        id: "1-1",
        stationId: "1",
        startTime: "09:00",
        endTime: "10:00",
        isAvailable: true,
        price: 50
      },
      {
        id: "1-2",
        stationId: "1",
        startTime: "10:00",
        endTime: "11:00",
        isAvailable: false,
        price: 50
      }
    ],
    "2": [
      {
        id: "2-1",
        stationId: "2",
        startTime: "09:00",
        endTime: "10:00",
        isAvailable: true,
        price: 45
      },
      {
        id: "2-2",
        stationId: "2",
        startTime: "10:00",
        endTime: "11:00",
        isAvailable: true,
        price: 45
      }
    ],
    "3": [
      {
        id: "3-1",
        stationId: "3",
        startTime: "09:00",
        endTime: "10:00",
        isAvailable: false,
        price: 55
      },
      {
        id: "3-2",
        stationId: "3",
        startTime: "10:00",
        endTime: "11:00",
        isAvailable: true,
        price: 55
      }
    ]
  })
})

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
}) 