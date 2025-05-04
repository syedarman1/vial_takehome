// app.ts

import fastify from 'fastify'               // bring in Fastify
import cors from '@fastify/cors'             // to handle CORS for our frontend
import formDataRoutes from './routes/form_data'
import queryRoutes from './routes/queries'
import errorHandler from './errors'           // centralized error formatter

/**
 * Set up the Fastify server: plugins, routes, error handling.
 */
export function build(opts = {}) {
  const app = fastify(opts)

  // only let our React app talk to this during dev
  app.register(cors, { origin: 'http://localhost:3000' })

  // all form-data endpoints live under /form-data
  app.register(formDataRoutes, { prefix: '/form-data' })

  // query CRUD lives at /queries, /queries/:id, etc.
  app.register(queryRoutes)

  // catch our ApiError throws and shape the JSON response
  app.setErrorHandler(errorHandler)

  return app
}

export default build