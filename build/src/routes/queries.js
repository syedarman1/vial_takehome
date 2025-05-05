"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = queryRoutes;
const db_client_1 = __importDefault(require("../db/db_client")); // our Prisma client configured for Postgres
const errors_1 = require("../errors"); // custom error class that our error handler picks up
/**
 * Mounts all `/queries` routes onto the Fastify instance.
 * Includes:
 *  - POST   /queries       → create a new query linked to a form entry
 *  - PATCH  /queries/:id   → mark an existing query as RESOLVED
 *  - DELETE /queries/:id   → delete a query by its ID
 */
async function queryRoutes(app) {
    //
    // CREATE a new query
    //  - expects: { title, formDataId, description? }
    //  - returns: the newly created Query record (201 Created)
    //
    app.post('/queries', {
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
            const { title, description, formDataId } = req.body;
            try {
                // prisma.query.create:
                //   - data: fields to insert
                //   - ties the new Query row to the given FormData via its UUID
                const newQuery = await db_client_1.default.query.create({
                    data: { title, description, formDataId },
                });
                // status 201 indicates resource creation
                reply.code(201).send(newQuery);
            }
            catch (err) {
                // any DB error or foreign-key mismatch bubbles up here
                // wrap in ApiError so our central error handler sends JSON { message, statusCode }
                throw new errors_1.ApiError('failed to create query', 400);
            }
        },
    });
    //
    // RESOLVE an existing query
    //  - expects: { id } in URL params
    //  - action: flips status from OPEN → RESOLVED
    //  - returns: the updated Query record
    //
    app.patch('/queries/:id', {
        schema: {
            // ensure `id` param is provided and is a string
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } },
            },
        },
        async handler(req, reply) {
            const { id } = req.params;
            try {
                // prisma.query.update:
                //   - where: identify the row by its primary key
                //   - data: update only the status field
                const updated = await db_client_1.default.query.update({
                    where: { id },
                    data: { status: 'RESOLVED' },
                });
                reply.send(updated);
            }
            catch (err) {
                // invalid ID, already resolved, or DB problem lands here
                throw new errors_1.ApiError('failed to resolve query', 400);
            }
        },
    });
    //
    // DELETE a query
    //  - expects: { id } in URL params
    //  - action: removes the row from the database
    //  - returns: 204 No Content on success
    //
    app.delete('/queries/:id', {
        async handler(req, reply) {
            const { id } = req.params;
            try {
                // prisma.query.delete:
                //   - where: primary key of the query to delete
                await db_client_1.default.query.delete({ where: { id } });
                // 204 tells client “we succeeded, but there’s no JSON body”
                reply.code(204).send();
            }
            catch (err) {
                // if the row doesn’t exist or DB error, we catch it here
                throw new errors_1.ApiError('failed to delete query', 400);
            }
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcXVlcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVlBLDhCQXdHQztBQWxIRCxnRUFBb0MsQ0FBUSw0Q0FBNEM7QUFDeEYsc0NBQW9DLENBQVEscURBQXFEO0FBRWpHOzs7Ozs7R0FNRztBQUNZLEtBQUssVUFBVSxXQUFXLENBQUMsR0FBb0I7SUFDNUQsRUFBRTtJQUNGLHFCQUFxQjtJQUNyQixrREFBa0Q7SUFDbEQsMkRBQTJEO0lBQzNELEVBQUU7SUFDRixHQUFHLENBQUMsSUFBSSxDQUVMLFVBQVUsRUFBRTtRQUNiLE1BQU0sRUFBRTtZQUNOLGdFQUFnRTtZQUNoRSxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztnQkFDakMsVUFBVSxFQUFFO29CQUNWLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7b0JBQ3pCLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7b0JBQy9CLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7aUJBQy9CO2FBQ0Y7U0FDRjtRQUNELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUs7WUFDdEIsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtZQUVuRCxJQUFJLENBQUM7Z0JBQ0gsdUJBQXVCO2dCQUN2Qiw2QkFBNkI7Z0JBQzdCLGdFQUFnRTtnQkFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxtQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ3pDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFO2lCQUN6QyxDQUFDLENBQUE7Z0JBRUYseUNBQXlDO2dCQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNoQyxDQUFDO1lBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztnQkFDbEIsdURBQXVEO2dCQUN2RCxtRkFBbUY7Z0JBQ25GLE1BQU0sSUFBSSxpQkFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ25ELENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQyxDQUFBO0lBRUYsRUFBRTtJQUNGLDRCQUE0QjtJQUM1QixtQ0FBbUM7SUFDbkMsK0NBQStDO0lBQy9DLHVDQUF1QztJQUN2QyxFQUFFO0lBQ0YsR0FBRyxDQUFDLEtBQUssQ0FFTixjQUFjLEVBQUU7UUFDakIsTUFBTSxFQUFFO1lBQ04sZ0RBQWdEO1lBQ2hELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTthQUN2QztTQUNGO1FBQ0QsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSztZQUN0QixNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtZQUV6QixJQUFJLENBQUM7Z0JBQ0gsdUJBQXVCO2dCQUN2QixpREFBaUQ7Z0JBQ2pELHlDQUF5QztnQkFDekMsTUFBTSxPQUFPLEdBQUcsTUFBTSxtQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ3hDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRTtvQkFDYixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFO2lCQUM3QixDQUFDLENBQUE7Z0JBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNyQixDQUFDO1lBQUMsT0FBTyxHQUFRLEVBQUUsQ0FBQztnQkFDbEIseURBQXlEO2dCQUN6RCxNQUFNLElBQUksaUJBQVEsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNwRCxDQUFDO1FBQ0gsQ0FBQztLQUNGLENBQUMsQ0FBQTtJQUVGLEVBQUU7SUFDRixpQkFBaUI7SUFDakIsbUNBQW1DO0lBQ25DLCtDQUErQztJQUMvQyx3Q0FBd0M7SUFDeEMsRUFBRTtJQUNGLEdBQUcsQ0FBQyxNQUFNLENBRVAsY0FBYyxFQUFFO1FBQ2pCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUs7WUFDdEIsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7WUFFekIsSUFBSSxDQUFDO2dCQUNILHVCQUF1QjtnQkFDdkIsZ0RBQWdEO2dCQUNoRCxNQUFNLG1CQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFFNUMsNERBQTREO2dCQUM1RCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ3hCLENBQUM7WUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO2dCQUNsQix5REFBeUQ7Z0JBQ3pELE1BQU0sSUFBSSxpQkFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ25ELENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQyxDQUFBO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBGYXN0aWZ5SW5zdGFuY2UgfSBmcm9tICdmYXN0aWZ5J1xyXG5pbXBvcnQgcHJpc21hIGZyb20gJy4uL2RiL2RiX2NsaWVudCcgICAgICAgIC8vIG91ciBQcmlzbWEgY2xpZW50IGNvbmZpZ3VyZWQgZm9yIFBvc3RncmVzXHJcbmltcG9ydCB7IEFwaUVycm9yIH0gZnJvbSAnLi4vZXJyb3JzJyAgICAgICAgLy8gY3VzdG9tIGVycm9yIGNsYXNzIHRoYXQgb3VyIGVycm9yIGhhbmRsZXIgcGlja3MgdXBcclxuXHJcbi8qKlxyXG4gKiBNb3VudHMgYWxsIGAvcXVlcmllc2Agcm91dGVzIG9udG8gdGhlIEZhc3RpZnkgaW5zdGFuY2UuXHJcbiAqIEluY2x1ZGVzOlxyXG4gKiAgLSBQT1NUICAgL3F1ZXJpZXMgICAgICAg4oaSIGNyZWF0ZSBhIG5ldyBxdWVyeSBsaW5rZWQgdG8gYSBmb3JtIGVudHJ5XHJcbiAqICAtIFBBVENIICAvcXVlcmllcy86aWQgICDihpIgbWFyayBhbiBleGlzdGluZyBxdWVyeSBhcyBSRVNPTFZFRFxyXG4gKiAgLSBERUxFVEUgL3F1ZXJpZXMvOmlkICAg4oaSIGRlbGV0ZSBhIHF1ZXJ5IGJ5IGl0cyBJRFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gcXVlcnlSb3V0ZXMoYXBwOiBGYXN0aWZ5SW5zdGFuY2UpIHtcclxuICAvL1xyXG4gIC8vIENSRUFURSBhIG5ldyBxdWVyeVxyXG4gIC8vICAtIGV4cGVjdHM6IHsgdGl0bGUsIGZvcm1EYXRhSWQsIGRlc2NyaXB0aW9uPyB9XHJcbiAgLy8gIC0gcmV0dXJuczogdGhlIG5ld2x5IGNyZWF0ZWQgUXVlcnkgcmVjb3JkICgyMDEgQ3JlYXRlZClcclxuICAvL1xyXG4gIGFwcC5wb3N0PHtcclxuICAgIEJvZHk6IHsgdGl0bGU6IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmc7IGZvcm1EYXRhSWQ6IHN0cmluZyB9XHJcbiAgfT4oJy9xdWVyaWVzJywge1xyXG4gICAgc2NoZW1hOiB7XHJcbiAgICAgIC8vIHZhbGlkYXRlIHRoZSBzaGFwZSBvZiB0aGUgcmVxdWVzdCBib2R5IGJlZm9yZSBydW5uaW5nIGhhbmRsZXJcclxuICAgICAgYm9keToge1xyXG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgICAgIHJlcXVpcmVkOiBbJ3RpdGxlJywgJ2Zvcm1EYXRhSWQnXSxcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgICB0aXRsZTogeyB0eXBlOiAnc3RyaW5nJyB9LFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IHsgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICAgIGZvcm1EYXRhSWQ6IHsgdHlwZTogJ3N0cmluZycgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGFzeW5jIGhhbmRsZXIocmVxLCByZXBseSkge1xyXG4gICAgICBjb25zdCB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZm9ybURhdGFJZCB9ID0gcmVxLmJvZHlcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gcHJpc21hLnF1ZXJ5LmNyZWF0ZTpcclxuICAgICAgICAvLyAgIC0gZGF0YTogZmllbGRzIHRvIGluc2VydFxyXG4gICAgICAgIC8vICAgLSB0aWVzIHRoZSBuZXcgUXVlcnkgcm93IHRvIHRoZSBnaXZlbiBGb3JtRGF0YSB2aWEgaXRzIFVVSURcclxuICAgICAgICBjb25zdCBuZXdRdWVyeSA9IGF3YWl0IHByaXNtYS5xdWVyeS5jcmVhdGUoe1xyXG4gICAgICAgICAgZGF0YTogeyB0aXRsZSwgZGVzY3JpcHRpb24sIGZvcm1EYXRhSWQgfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBzdGF0dXMgMjAxIGluZGljYXRlcyByZXNvdXJjZSBjcmVhdGlvblxyXG4gICAgICAgIHJlcGx5LmNvZGUoMjAxKS5zZW5kKG5ld1F1ZXJ5KVxyXG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgIC8vIGFueSBEQiBlcnJvciBvciBmb3JlaWduLWtleSBtaXNtYXRjaCBidWJibGVzIHVwIGhlcmVcclxuICAgICAgICAvLyB3cmFwIGluIEFwaUVycm9yIHNvIG91ciBjZW50cmFsIGVycm9yIGhhbmRsZXIgc2VuZHMgSlNPTiB7IG1lc3NhZ2UsIHN0YXR1c0NvZGUgfVxyXG4gICAgICAgIHRocm93IG5ldyBBcGlFcnJvcignZmFpbGVkIHRvIGNyZWF0ZSBxdWVyeScsIDQwMClcclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KVxyXG5cclxuICAvL1xyXG4gIC8vIFJFU09MVkUgYW4gZXhpc3RpbmcgcXVlcnlcclxuICAvLyAgLSBleHBlY3RzOiB7IGlkIH0gaW4gVVJMIHBhcmFtc1xyXG4gIC8vICAtIGFjdGlvbjogZmxpcHMgc3RhdHVzIGZyb20gT1BFTiDihpIgUkVTT0xWRURcclxuICAvLyAgLSByZXR1cm5zOiB0aGUgdXBkYXRlZCBRdWVyeSByZWNvcmRcclxuICAvL1xyXG4gIGFwcC5wYXRjaDx7XHJcbiAgICBQYXJhbXM6IHsgaWQ6IHN0cmluZyB9XHJcbiAgfT4oJy9xdWVyaWVzLzppZCcsIHtcclxuICAgIHNjaGVtYToge1xyXG4gICAgICAvLyBlbnN1cmUgYGlkYCBwYXJhbSBpcyBwcm92aWRlZCBhbmQgaXMgYSBzdHJpbmdcclxuICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXHJcbiAgICAgICAgcmVxdWlyZWQ6IFsnaWQnXSxcclxuICAgICAgICBwcm9wZXJ0aWVzOiB7IGlkOiB7IHR5cGU6ICdzdHJpbmcnIH0gfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBhc3luYyBoYW5kbGVyKHJlcSwgcmVwbHkpIHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtc1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBwcmlzbWEucXVlcnkudXBkYXRlOlxyXG4gICAgICAgIC8vICAgLSB3aGVyZTogaWRlbnRpZnkgdGhlIHJvdyBieSBpdHMgcHJpbWFyeSBrZXlcclxuICAgICAgICAvLyAgIC0gZGF0YTogdXBkYXRlIG9ubHkgdGhlIHN0YXR1cyBmaWVsZFxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCBwcmlzbWEucXVlcnkudXBkYXRlKHtcclxuICAgICAgICAgIHdoZXJlOiB7IGlkIH0sXHJcbiAgICAgICAgICBkYXRhOiB7IHN0YXR1czogJ1JFU09MVkVEJyB9LFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJlcGx5LnNlbmQodXBkYXRlZClcclxuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgICAvLyBpbnZhbGlkIElELCBhbHJlYWR5IHJlc29sdmVkLCBvciBEQiBwcm9ibGVtIGxhbmRzIGhlcmVcclxuICAgICAgICB0aHJvdyBuZXcgQXBpRXJyb3IoJ2ZhaWxlZCB0byByZXNvbHZlIHF1ZXJ5JywgNDAwKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pXHJcblxyXG4gIC8vXHJcbiAgLy8gREVMRVRFIGEgcXVlcnlcclxuICAvLyAgLSBleHBlY3RzOiB7IGlkIH0gaW4gVVJMIHBhcmFtc1xyXG4gIC8vICAtIGFjdGlvbjogcmVtb3ZlcyB0aGUgcm93IGZyb20gdGhlIGRhdGFiYXNlXHJcbiAgLy8gIC0gcmV0dXJuczogMjA0IE5vIENvbnRlbnQgb24gc3VjY2Vzc1xyXG4gIC8vXHJcbiAgYXBwLmRlbGV0ZTx7XHJcbiAgICBQYXJhbXM6IHsgaWQ6IHN0cmluZyB9XHJcbiAgfT4oJy9xdWVyaWVzLzppZCcsIHtcclxuICAgIGFzeW5jIGhhbmRsZXIocmVxLCByZXBseSkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zXHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIHByaXNtYS5xdWVyeS5kZWxldGU6XHJcbiAgICAgICAgLy8gICAtIHdoZXJlOiBwcmltYXJ5IGtleSBvZiB0aGUgcXVlcnkgdG8gZGVsZXRlXHJcbiAgICAgICAgYXdhaXQgcHJpc21hLnF1ZXJ5LmRlbGV0ZSh7IHdoZXJlOiB7IGlkIH0gfSlcclxuXHJcbiAgICAgICAgLy8gMjA0IHRlbGxzIGNsaWVudCDigJx3ZSBzdWNjZWVkZWQsIGJ1dCB0aGVyZeKAmXMgbm8gSlNPTiBib2R54oCdXHJcbiAgICAgICAgcmVwbHkuY29kZSgyMDQpLnNlbmQoKVxyXG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgIC8vIGlmIHRoZSByb3cgZG9lc27igJl0IGV4aXN0IG9yIERCIGVycm9yLCB3ZSBjYXRjaCBpdCBoZXJlXHJcbiAgICAgICAgdGhyb3cgbmV3IEFwaUVycm9yKCdmYWlsZWQgdG8gZGVsZXRlIHF1ZXJ5JywgNDAwKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gIH0pXHJcbn1cclxuIl19