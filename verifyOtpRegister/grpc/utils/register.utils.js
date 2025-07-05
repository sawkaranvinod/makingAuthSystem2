import { registerClient } from "../client/register.client.js";

export function grpcRegister(name, email, password, ipAddress,devicehash) {
  return new Promise((resolve, reject) => {
    try {
      registerClient.register(
        { name, email, password, ipAddress,devicehash},
        (err, res) => {
          if (err) {
            console.log(
              "error coming from the register grpc server",
              err.message
            );
            return reject({
              code: 13,
              message: "error coming from the register grpc server",
            });
          }
          if (Object.keys(res).length === 0) {
            return reject({
              code: 13,
              message: "response is not coming from the register grpc server",
            });
          }

          return resolve(res);
        }
      );
    } catch (error) {
        console.log("error in the util function of grpc",error.message);
        return reject(
            {
                code:13,
                message:"error in the util function of grpc",
            }
        )
    }
  });
}
