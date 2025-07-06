import { authenticateRouter } from "./authenticate.route.js";

export function masterRouter(fastify, opts) {
    fastify.register(authenticateRouter, { prefix: "/authenticate" });
}