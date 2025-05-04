
import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'        // our Prisma client configured for Postgres
import { ApiError } from '../errors'        // custom error class that our error handler picks up

/**
 * Mounts all `/queries` routes onto the Fastify instance.
 * Includes:
 *  - POST   /queries       → create a new query linked to a form entry
 *  - PATCH  /queries/:id   → mark an existing query as RESOLVED
 *  - DELETE /queries/:id   → delete a query by its ID
 */
export default async function queryRoutes(app: FastifyInstance) {
  //
  // CREATE a new query
  //  - expects: { title, formDataId, description? }
  //  - returns: the newly created Query record (201 Created)
  //
  app.post<{
    Body: { title: string; description?: string; formDataId: string }
  }>('/queries', {
    schema: {
      // validate the shape of the request body before running handler
      body: {
        type: 'object',
        required: ['title', 'formDataId'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          formDataId: { type: 'string' },
        },
      },
    },
    async handler(req, reply) {
      const { title, description, formDataId } = req.body

      try {
        // prisma.query.create:
        //   - data: fields to insert
        //   - ties the new Query row to the given FormData via its UUID
        const newQuery = await prisma.query.create({
          data: { title, description, formDataId },
        })

        // status 201 indicates resource creation
        reply.code(201).send(newQuery)
      } catch (err: any) {
        // any DB error or foreign-key mismatch bubbles up here
        // wrap in ApiError so our central error handler sends JSON { message, statusCode }
        throw new ApiError('failed to create query', 400)
      }
    },
  })

  //
  // RESOLVE an existing query
  //  - expects: { id } in URL params
  //  - action: flips status from OPEN → RESOLVED
  //  - returns: the updated Query record
  //
  app.patch<{
    Params: { id: string }
  }>('/queries/:id', {
    schema: {
      // ensure `id` param is provided and is a string
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } },
      },
    },
    async handler(req, reply) {
      const { id } = req.params

      try {
        // prisma.query.update:
        //   - where: identify the row by its primary key
        //   - data: update only the status field
        const updated = await prisma.query.update({
          where: { id },
          data: { status: 'RESOLVED' },
        })

        reply.send(updated)
      } catch (err: any) {
        // invalid ID, already resolved, or DB problem lands here
        throw new ApiError('failed to resolve query', 400)
      }
    },
  })

  //
  // DELETE a query
  //  - expects: { id } in URL params
  //  - action: removes the row from the database
  //  - returns: 204 No Content on success
  //
  app.delete<{
    Params: { id: string }
  }>('/queries/:id', {
    async handler(req, reply) {
      const { id } = req.params

      try {
        // prisma.query.delete:
        //   - where: primary key of the query to delete
        await prisma.query.delete({ where: { id } })

        // 204 tells client “we succeeded, but there’s no JSON body”
        reply.code(204).send()
      } catch (err: any) {
        // if the row doesn’t exist or DB error, we catch it here
        throw new ApiError('failed to delete query', 400)
      }
    },
  })
}
