import {LoginDetails} from "../../schema/loginDetails.model.js";
import {User} from "../../schema/user.model.js";
import argon from "argon2";
import mongoose from "mongoose";

export const loginServices = {
    login: async (call, callback) => {
        try {
            const { email, password } = call.request;
            const user = await User.findOne({ email });
            if (!user) {
                return callback(
                    {
                        code: 13,
                        message: "user does not exist",
                    }
                );
            };
            const passMatched = await argon.verify(user.password, password);
            if (!passMatched) {
                return callback(null,{passMatched:false});
            };
            return callback(null, { passMatched: true });
        } catch (error) {
            console.log("error inside the login services in services", error.message);
            callback(
                {
                    code: 13,
                    message: error.message,
                }
            );
        };
    },
    saveLoginDetail: async (call, callback) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { ipAddress, deviceHash, email } = call.request;
            const user = await User.findOne({ email }).session(session);
            if (!user) {
                await session.abortTransaction();
                session.endSession();
                return callback({
                    code: 13,
                    message: "user does not exist",
                });
            }
            const loginDetail = await LoginDetails.create(
                [{
                    ipAddress,
                    deviceHash,
                }],
                { session }
            );

            user.loginDetails = loginDetail[0]._id;
            await user.save({ session });

            await session.commitTransaction();
            session.endSession();
            return callback(null, { saved: true });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("error in inside the services of the grpc services", error.message);
            return callback(
                {
                    code: 13,
                    message: error.message,
                }
            );
        }
    }
}