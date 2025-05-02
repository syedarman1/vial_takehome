import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'
import { ApiError } from '../errors'

async function queryRoutes(app: FastifyInstance) {
  app.post<{
    Body: {
      title: string
      description?: string
      formDataId: string
    }
  }>('/queries', {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'formDataId'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          formDataId: { type: 'string', format: 'uuid' }
        }
      }
    },
    async handler(request, reply) {
      const { title, description, formDataId } = request.body
      try {
        const newQuery = await prisma.query.create({
          data: { title, description, formDataId }
        })
        reply.code(201).send(newQuery)
      } catch (err: any) {
        throw new ApiError('failed to create query', 400)
      }
    }
  })
}

export default queryRoutes
