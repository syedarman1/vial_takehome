import { FastifyInstance } from 'fastify';
/**
 * Mounts all `/queries` routes onto the Fastify instance.
 * Includes:
 *  - POST   /queries       → create a new query linked to a form entry
 *  - PATCH  /queries/:id   → mark an existing query as RESOLVED
 *  - DELETE /queries/:id   → delete a query by its ID
 */
export default function queryRoutes(app: FastifyInstance): Promise<void>;
//# sourceMappingURL=queries.d.ts.map