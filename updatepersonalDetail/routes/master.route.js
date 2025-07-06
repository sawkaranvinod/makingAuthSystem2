import {updateDobRoute} from "./updateDob.route.js";
import {updateNameRoute} from "./updateName.route.js";
export function masterRouter(fastify,opts) {
    fastify.register(updateDobRoute,{prefix:"/updatedob"});
    fastify.register(updateNameRoute,{prefix:"/updateName"});
};