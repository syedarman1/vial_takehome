import build from './app'
import { FastifyInstance } from 'fastify'


const PORT = parseInt(process.env.PORT ?? '8080', 10)

const server: FastifyInstance = build({
  logger: { level: 'error' },
})

server
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(address => console.log(`Server listening at ${address}`))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
