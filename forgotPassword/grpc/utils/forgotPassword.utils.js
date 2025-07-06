import {forgotPasswordClient} from "../client/forgotPassword.client.js";


export function grpcForgotPassword(email,password) {
    return new Promise(
        (resolve,reject) =>{
            try {
                forgotPasswordClient.forgotPassword(
                    {email,password},
                    (err,res)=>{
                        if (err) {
                            console.log("error is coming from the grpc function of the forgotPassword",err.message);
                            return reject(
                                {
                                    code:12,
                                    message:err.message,
                                },
                            );
                        };
                        resolve(res);
                    },
                )
            } catch (error) {
                console.log("error is inside the grpc forgotpassword promise function",error.message);
                return reject(
                    {
                        code:13,
                        message:error.message,
                    },
                );
            };
        },
    );
};