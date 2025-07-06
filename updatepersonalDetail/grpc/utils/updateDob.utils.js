import {updatePersonalDetailClient} from "../client/updatePersonalDetail.client.js";
export function grpcupdateDob(email,dob) {
    return new Promise(
        (resolve,reject)=>{
            try {
                updatePersonalDetailClient.updateDob(
                    {email,dob},
                    (err,res)=>{
                        if (err) {
                            console.log("error is coming from the grpc server of the update dob",err.message);
                            reject(
                                {
                                    code:13,
                                    message:err.message,
                                }
                            )
                        };
                        if (Object.keys(res) === 0) {
                            reject(
                                {
                                    code:13,
                                    message:err.message,
                                }
                            );
                        };
                        resolve(res);
                    }
                )
            } catch (error) {
                console.log("error in the grpc updatedob",error.message);
                reject(
                    {
                        code:13,
                        message:error.message,
                    }
                )
            }
        }
    )
}