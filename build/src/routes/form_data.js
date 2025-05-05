"use strict";
// routes/form_data.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formDataRoutes;
const db_client_1 = __importDefault(require("../db/db_client")); // talking to Postgres via Prisma
const pre_serializer_1 = require("./middleware/pre_serializer");
const errors_1 = require("../errors");
/**
 * GET /form-data
 * Fetch all form entries along with their linked queries.
 */
async function formDataRoutes(app) {
    // use our custom serializer to strip out anything private
    app.setReplySerializer(pre_serializer_1.serializer);
    // group logs under “formDataRoutes” so we know where errors come from
    const log = app.log.child({ component: 'formDataRoutes' });
    app.get('', {
        async handler(req, reply) {
            try {
                // grab every form entry and include its queries
                const data = await db_client_1.default.formData.findMany({
                    include: { queries: true },
                });
                // send back total count plus the array of entries
                reply.send({ total: data.length, formData: data });
            }
            catch (err) {
                log.error({ err }, 'could not load form data');
                throw new errors_1.ApiError('failed to fetch form data', 400);
            }
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9mb3JtX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFzQjs7Ozs7QUFZdEIsaUNBdUJDO0FBaENELGdFQUFvQyxDQUFVLGlDQUFpQztBQUMvRSxnRUFBd0Q7QUFFeEQsc0NBQW9DO0FBRXBDOzs7R0FHRztBQUNZLEtBQUssVUFBVSxjQUFjLENBQUMsR0FBb0I7SUFDL0QsMERBQTBEO0lBQzFELEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQywyQkFBVSxDQUFDLENBQUE7SUFFbEMsc0VBQXNFO0lBQ3RFLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQTtJQUUxRCxHQUFHLENBQUMsR0FBRyxDQUE4QixFQUFFLEVBQUU7UUFDdkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSztZQUN0QixJQUFJLENBQUM7Z0JBQ0gsZ0RBQWdEO2dCQUNoRCxNQUFNLElBQUksR0FBRyxNQUFNLG1CQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztvQkFDMUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtpQkFDM0IsQ0FBQyxDQUFBO2dCQUVGLGtEQUFrRDtnQkFDbEQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ3BELENBQUM7WUFBQyxPQUFPLEdBQVEsRUFBRSxDQUFDO2dCQUNsQixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsMEJBQTBCLENBQUMsQ0FBQTtnQkFDOUMsTUFBTSxJQUFJLGlCQUFRLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDdEQsQ0FBQztRQUNILENBQUM7S0FDRixDQUFDLENBQUE7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcm91dGVzL2Zvcm1fZGF0YS50c1xuXG5pbXBvcnQgeyBGYXN0aWZ5SW5zdGFuY2UgfSBmcm9tICdmYXN0aWZ5J1xuaW1wb3J0IHByaXNtYSBmcm9tICcuLi9kYi9kYl9jbGllbnQnICAgICAgICAgIC8vIHRhbGtpbmcgdG8gUG9zdGdyZXMgdmlhIFByaXNtYVxuaW1wb3J0IHsgc2VyaWFsaXplciB9IGZyb20gJy4vbWlkZGxld2FyZS9wcmVfc2VyaWFsaXplcicgIFxuaW1wb3J0IHsgSUNvdW50ZWRGb3JtRGF0YSB9IGZyb20gJy4vc2NoZW1hcy9mb3JtRGF0YS5pbnRlcmZhY2UnXG5pbXBvcnQgeyBBcGlFcnJvciB9IGZyb20gJy4uL2Vycm9ycydcblxuLyoqXG4gKiBHRVQgL2Zvcm0tZGF0YVxuICogRmV0Y2ggYWxsIGZvcm0gZW50cmllcyBhbG9uZyB3aXRoIHRoZWlyIGxpbmtlZCBxdWVyaWVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBmb3JtRGF0YVJvdXRlcyhhcHA6IEZhc3RpZnlJbnN0YW5jZSkge1xuICAvLyB1c2Ugb3VyIGN1c3RvbSBzZXJpYWxpemVyIHRvIHN0cmlwIG91dCBhbnl0aGluZyBwcml2YXRlXG4gIGFwcC5zZXRSZXBseVNlcmlhbGl6ZXIoc2VyaWFsaXplcilcblxuICAvLyBncm91cCBsb2dzIHVuZGVyIOKAnGZvcm1EYXRhUm91dGVz4oCdIHNvIHdlIGtub3cgd2hlcmUgZXJyb3JzIGNvbWUgZnJvbVxuICBjb25zdCBsb2cgPSBhcHAubG9nLmNoaWxkKHsgY29tcG9uZW50OiAnZm9ybURhdGFSb3V0ZXMnIH0pXG5cbiAgYXBwLmdldDx7IFJlcGx5OiBJQ291bnRlZEZvcm1EYXRhIH0+KCcnLCB7XG4gICAgYXN5bmMgaGFuZGxlcihyZXEsIHJlcGx5KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBncmFiIGV2ZXJ5IGZvcm0gZW50cnkgYW5kIGluY2x1ZGUgaXRzIHF1ZXJpZXNcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHByaXNtYS5mb3JtRGF0YS5maW5kTWFueSh7XG4gICAgICAgICAgaW5jbHVkZTogeyBxdWVyaWVzOiB0cnVlIH0sXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gc2VuZCBiYWNrIHRvdGFsIGNvdW50IHBsdXMgdGhlIGFycmF5IG9mIGVudHJpZXNcbiAgICAgICAgcmVwbHkuc2VuZCh7IHRvdGFsOiBkYXRhLmxlbmd0aCwgZm9ybURhdGE6IGRhdGEgfSlcbiAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgIGxvZy5lcnJvcih7IGVyciB9LCAnY291bGQgbm90IGxvYWQgZm9ybSBkYXRhJylcbiAgICAgICAgdGhyb3cgbmV3IEFwaUVycm9yKCdmYWlsZWQgdG8gZmV0Y2ggZm9ybSBkYXRhJywgNDAwKVxuICAgICAgfVxuICAgIH0sXG4gIH0pXG59XG4iXX0=