import { User } from "../../schema/user.model.js";
import mongoose from "mongoose";

export const updatePersonalDetailServices = {
    updateName: async (call, callback) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { email, name } = call.request;
            const user = await User.findOne({ email }).session(session);
            if (!user) {
                await session.abortTransaction();
                session.endSession();
                return callback({
                    code: 13,
                    message: "user does not exist",
                });
            }
            user.name = name;
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return callback(null, { updated: true });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("error in updateName service:", error.message);
            return callback({
                code: 13,
                message: error.message,
            });
        }
    },

    updateDob: async (call, callback) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { email, dob } = call.request;
            const user = await User.findOne({ email }).session(session);
            if (!user) {
                await session.abortTransaction();
                session.endSession();
                return callback({
                    code: 13,
                    message: "user does not exist",
                });
            }
            user.dateOfBirth = dob;
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return callback(null, { updated: true });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("error in updateDob service:", error.message);
            return callback({
                code: 13,
                message: error.message,
            });
        }
    },

    updateProfilePhoto: async (call, callback) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { email, profilePhoto } = call.request;
            const user = await User.findOne({ email }).session(session);
            if (!user) {
                await session.abortTransaction();
                session.endSession();
                return callback({
                    code: 13,
                    message: "user does not exist",
                });
            }
            user.profilePhotoUrl = profilePhoto;
            await user.save({ session });
            await session.commitTransaction();
            session.endSession();
            return callback(null, { updated: true });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("error in updateProfilePhoto service:", error.message);
            return callback({
                code: 13,
                message: error.message,
            });
        }
    }
};