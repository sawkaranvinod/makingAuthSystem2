import {loginClient} from "../client/login.client.js";


export function grpcLogin(email, password) {
        return new Promise((resolve, reject) => {
            try {
                loginClient.Login({ email, password }, (err, res) => {
                    if (err) {
                        return reject(
                            {
                                code:13,
                                message: err.message,
                            }
                        );
                    }
                    resolve(res);
                });
            } catch (error) {
                console.log("error inside the promise function of the grpc login",error.message);
                reject(
                    {
                        code: 13,
                        message:error.message
                    }
                )
            }
        });
}