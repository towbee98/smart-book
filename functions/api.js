const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser)

// Use default router
server.use('/api', router)

// Export the serverless function
module.exports.handler = (event, context, callback) => {
  const { path, httpMethod, queryStringParameters, body } = event

  // Create a mock request object
  const req = {
    method: httpMethod,
    query: queryStringParameters || {},
    body: body ? JSON.parse(body) : {},
    path: path.replace('/.netlify/functions/api', '')
  }

  // Create a mock response object
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    json: (data) => {
      res.body = JSON.stringify(data)
      return res
    },
    status: (code) => {
      res.statusCode = code
      return res
    }
  }

  // Handle the request
  server(req, res, () => {
    callback(null, {
      statusCode: res.statusCode,
      headers: {
        'Content-Type': 'application/json',
        ...res.headers
      },
      body: res.body
    })
  })
} 