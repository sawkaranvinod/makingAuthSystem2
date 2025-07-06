import { updatePersonalDetailClient } from "../client/updatePersonalDetail.client.js";

export function grpcUpdateProfilePhoto(email, profilePhoto) {
    return new Promise((resolve, reject) => {
        try {
            updatePersonalDetailClient.updateProfilePhoto(
                { email, profilePhoto },
                (err, res) => {
                    if (err) {
                        console.log("error is coming from the grpc server of updateProfilePhoto", err.message);
                        return reject({
                            code: 13,
                            message: err.message,
                        });
                    }
                    if (!res || Object.keys(res).length === 0) {
                        return reject({
                            code: 13,
                            message: "response is not coming from the grpc of updateProfilePhoto",
                        });
                    }
                    resolve(res);
                }
            );
        } catch (error) {
            console.log("error inside the grpc function of updateProfilePhoto", error.message);
            reject({
                code: 13,
                message: error.message,
            });
        }
    });
}