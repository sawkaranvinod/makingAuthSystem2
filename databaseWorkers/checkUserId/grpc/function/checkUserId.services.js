import { User } from "../../schema/user.model.js";
export const services = {
    checkUserId: async (call, callback) => {
        try {
            const data = call?.request;
            const { email } = data;
            const availability = await User.findOne({ email });
            if (availability) {
                callback(null, { available: "false" });
            }
            callback(null, { available: "true" });
        } catch (error) {
            console.log("error in the service of the grpc", error);
            callback({
                code: 13,
                message: "error in service function",
            });
        };
    },
};