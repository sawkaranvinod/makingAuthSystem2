import {updatePersonalDetailClient} from "../client/updatePersonalDetail.client.js";

export function grpcUpdateName(email,name) {
    return new Promise(
        (resolve,reject)=>{
            try {
                updatePersonalDetailClient.updateName(
                    {email,name},
                    (err,res)=>{
                        if (err) {
                            console.log("error is coming from the grpc server from updateName",err.message);
                            reject(
                                {
                                    code:13,
                                    message:err.message,
                                }
                            );
                        };
                        if (Object.keys(res) === 0) {
                            reject(
                                {
                                    code:12,
                                    message:"response is not coming from the grpc of the update name",
                                }
                            )
                        };
                        resolve(res);
                    }
                )
            } catch (error) {
                console.log("error inside the grpc function of the updateName",error.message);
                reject(
                    {
                        code:13,
                        message:error.message,
                    }
                )
            }
        }
    )
};