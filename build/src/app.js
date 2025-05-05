"use strict";
// app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const fastify_1 = __importDefault(require("fastify")); // bring in Fastify
const cors_1 = __importDefault(require("@fastify/cors")); // to handle CORS for our frontend
const form_data_1 = __importDefault(require("./routes/form_data"));
const queries_1 = __importDefault(require("./routes/queries"));
const errors_1 = __importDefault(require("./errors")); // centralized error formatter
/**
 * Set up the Fastify server: plugins, routes, error handling.
 */
function build(opts = {}) {
    const app = (0, fastify_1.default)(opts);
    // only let our React app talk to this during dev
    app.register(cors_1.default, { origin: 'http://localhost:3000' });
    // all form-data endpoints live under /form-data
    app.register(form_data_1.default, { prefix: '/form-data' });
    // query CRUD lives at /queries, /queries/:id, etc.
    app.register(queries_1.default);
    // catch our ApiError throws and shape the JSON response
    app.setErrorHandler(errors_1.default);
    return app;
}
exports.default = build;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUzs7Ozs7QUFXVCxzQkFnQkM7QUF6QkQsc0RBQTZCLENBQWUsbUJBQW1CO0FBQy9ELHlEQUFnQyxDQUFhLGtDQUFrQztBQUMvRSxtRUFBK0M7QUFDL0MsK0RBQTBDO0FBQzFDLHNEQUFtQyxDQUFXLDhCQUE4QjtBQUU1RTs7R0FFRztBQUNILFNBQWdCLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtJQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFFekIsaURBQWlEO0lBQ2pELEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQTtJQUV2RCxnREFBZ0Q7SUFDaEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQkFBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7SUFFdEQsbURBQW1EO0lBQ25ELEdBQUcsQ0FBQyxRQUFRLENBQUMsaUJBQVcsQ0FBQyxDQUFBO0lBRXpCLHdEQUF3RDtJQUN4RCxHQUFHLENBQUMsZUFBZSxDQUFDLGdCQUFZLENBQUMsQ0FBQTtJQUVqQyxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUM7QUFFRCxrQkFBZSxLQUFLLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcblxuaW1wb3J0IGZhc3RpZnkgZnJvbSAnZmFzdGlmeScgICAgICAgICAgICAgICAvLyBicmluZyBpbiBGYXN0aWZ5XG5pbXBvcnQgY29ycyBmcm9tICdAZmFzdGlmeS9jb3JzJyAgICAgICAgICAgICAvLyB0byBoYW5kbGUgQ09SUyBmb3Igb3VyIGZyb250ZW5kXG5pbXBvcnQgZm9ybURhdGFSb3V0ZXMgZnJvbSAnLi9yb3V0ZXMvZm9ybV9kYXRhJ1xuaW1wb3J0IHF1ZXJ5Um91dGVzIGZyb20gJy4vcm91dGVzL3F1ZXJpZXMnXG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4vZXJyb3JzJyAgICAgICAgICAgLy8gY2VudHJhbGl6ZWQgZXJyb3IgZm9ybWF0dGVyXG5cbi8qKlxuICogU2V0IHVwIHRoZSBGYXN0aWZ5IHNlcnZlcjogcGx1Z2lucywgcm91dGVzLCBlcnJvciBoYW5kbGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkKG9wdHMgPSB7fSkge1xuICBjb25zdCBhcHAgPSBmYXN0aWZ5KG9wdHMpXG5cbiAgLy8gb25seSBsZXQgb3VyIFJlYWN0IGFwcCB0YWxrIHRvIHRoaXMgZHVyaW5nIGRldlxuICBhcHAucmVnaXN0ZXIoY29ycywgeyBvcmlnaW46ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnIH0pXG5cbiAgLy8gYWxsIGZvcm0tZGF0YSBlbmRwb2ludHMgbGl2ZSB1bmRlciAvZm9ybS1kYXRhXG4gIGFwcC5yZWdpc3Rlcihmb3JtRGF0YVJvdXRlcywgeyBwcmVmaXg6ICcvZm9ybS1kYXRhJyB9KVxuXG4gIC8vIHF1ZXJ5IENSVUQgbGl2ZXMgYXQgL3F1ZXJpZXMsIC9xdWVyaWVzLzppZCwgZXRjLlxuICBhcHAucmVnaXN0ZXIocXVlcnlSb3V0ZXMpXG5cbiAgLy8gY2F0Y2ggb3VyIEFwaUVycm9yIHRocm93cyBhbmQgc2hhcGUgdGhlIEpTT04gcmVzcG9uc2VcbiAgYXBwLnNldEVycm9ySGFuZGxlcihlcnJvckhhbmRsZXIpXG5cbiAgcmV0dXJuIGFwcFxufVxuXG5leHBvcnQgZGVmYXVsdCBidWlsZCJdfQ==