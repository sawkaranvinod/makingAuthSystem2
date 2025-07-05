import { sendOtpClient } from "../client/sendOtp.client.js";


export function grpcSendOtp(to, subject, data) {
    return new Promise((resolve, reject) => {
        try {
            sendOtpClient.sendOtp(
                { to,subject, data },
                (err, res) => {
                    if (err) {
                        console.log("error coming from the grpcSendOtp server", err.message);
                        return reject({message:err.message, sent: false });
                    }
                    return resolve(res);
                }
            );
        } catch (error) {
            console.log("error in the promise of the grpcSendOtp", error.message);
            return reject({message:error.message, sent: false });
        }
    });
};
