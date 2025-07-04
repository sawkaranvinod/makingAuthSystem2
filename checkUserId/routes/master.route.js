import checkUserIdRoutes from "./checkUserId.routes.js";

async function masterRouter(fastify, opts) {
  fastify.register(checkUserIdRoutes, { prefix: "/api/v1" });
}

export default masterRouter;
