// routes/form_data.ts

import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'          // talking to Postgres via Prisma
import { serializer } from './middleware/pre_serializer'  
import { ICountedFormData } from './schemas/formData.interface'
import { ApiError } from '../errors'

/**
 * GET /form-data
 * Fetch all form entries along with their linked queries.
 */
export default async function formDataRoutes(app: FastifyInstance) {
  // use our custom serializer to strip out anything private
  app.setReplySerializer(serializer)

  // group logs under “formDataRoutes” so we know where errors come from
  const log = app.log.child({ component: 'formDataRoutes' })

  app.get<{ Reply: ICountedFormData }>('', {
    async handler(req, reply) {
      try {
        // grab every form entry and include its queries
        const data = await prisma.formData.findMany({
          include: { queries: true },
        })

        // send back total count plus the array of entries
        reply.send({ total: data.length, formData: data })
      } catch (err: any) {
        log.error({ err }, 'could not load form data')
        throw new ApiError('failed to fetch form data', 400)
      }
    },
  })
}
