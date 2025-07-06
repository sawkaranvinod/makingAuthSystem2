import {User} from "../../schema/user.model.js";
export const forgotPasswordServices = {
    forgotPassword: async (call,callback) => {
        try {
            const {email,password} = call.request;
            let user = await User.findOne({email});
            if (!user) {
                callback(
                    {
                        code:13,
                        message:"user dont exist"
                    }
                );
            };
            user.hashedPassword = password;
            user = await user.save(); 
            call(null,{changed:true});
        } catch (error) {
            console.log("error in the forgot password of the services",error.message);
            return callback(
                {
                    code:13,
                    message:error.message,
                }
            )
        }
    }
};