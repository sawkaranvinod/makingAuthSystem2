import { updateProfilePhotoMiddleware } from "../middleware/updateProfilePhoto.middleware.js";
import { handleUpdateProfilePhoto } from "../controllers/updateProfilePhoto.controller.js";

export function updateProfilePhotoRoute(fastify, opts) {
    fastify.route({
        method: "POST",
        url: "/update-profile-photo",
        schema: {},
        preHandler: updateProfilePhotoMiddleware,
        handler: handleUpdateProfilePhoto,
    });
}