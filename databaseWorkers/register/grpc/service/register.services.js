import { User } from "../../schema/user.model.js";
import { LoginDetails } from "../../schema/loginDetails.model.js";
import mongoose from "mongoose";

export const registerService = {
    register: async (call, callback) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { name, email, password, ipAddress, devicehash } = call.request;

            const loginDetails = await LoginDetails.create([{
                ipAddress,
                devicehash
            }], { session });

            await User.create([{
                name,
                email,
                hashedPassword: password,
                loginDetails: loginDetails[0]._id
            }], { session });

            await session.commitTransaction();
            session.endSession();
            return callback(null, { saved: true });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("error in the register service of grpc", error.message);
            callback({
                code: 13,
                message: "error in the register service of grpc"
            });
        }
    }
};