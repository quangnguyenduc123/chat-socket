import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import express from 'express'
import compress from 'compression'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import config from './src/config/index.js'
import routes from './src/api/routes.js'
import expressErrorHandler from './src/common/error-handler.js'
import authorityCheck from './src/middleware/authorityCheck.js'

const app = express()

// parse body params and attache them to req.body
app.use(express.json({ limit: '2000kb' }))

app.use(express.urlencoded({ extended: false }))

// 400 - Bad request Invalid json
app.use((err, req, res, next) => {
  if (err.status === 400) {
    return res.status(400).json({
      code: 400,
      message: 'Bad Request',
    })
  }
  next()
})

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

// Compress response
app.use(compress())

// secure apps by setting various HTTP headers
app.use(helmet.frameguard({ action: 'deny' }))

// Cross-Origin Resource Sharing
const corsOptions = {
  origin: [config.API_BASE_URI],
  methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: [
    'Authorization',
    'Origin',
    'Content-Type',
    'Accept',
    'x-xsrf-token',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Auth',
    description: 'Define Api on Auth API System',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  openapi: '3.0.0',
}

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./src/api/routes.js', './src/api/*/*-route.js'],
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)

// FIXME: Source code quality issues by 'DEVICE-LINK'
// eslint-disable-next-line func-names
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// limit access with external API
const limiter = rateLimit({
  windowMs: config.EXTERNAL_API_TIME_LIMIT,
  max: config.EXTERNAL_API_REQUEST_LIMIT,
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  handler: function(req, res) {
    res.status(429).json({
      code: 429,
      message: 'Too many requests, please try again later.',
    })
  },
})
app.use(limiter)

/* version 
app.get('/', function(req, res) {
  return res.send(`Version: ${config.version}`)
})*/

function trimmer(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    for (const [key, value] of Object.entries(req.body)) {
      req.body[key] = value.toString().trim()
    }
  }
  next()
}
app.use(trimmer)

//Check authorization header
app.use(authorityCheck)

// Mount all api routes
app.use('/', routes)

// Handle error middleware
app.use(expressErrorHandler)

app.listen(config.PORT, err => {
  if (err) {
    process.exit(1)
  }
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${config.PORT}`)
})
