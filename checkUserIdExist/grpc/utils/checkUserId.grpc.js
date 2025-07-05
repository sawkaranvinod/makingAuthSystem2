import checkUserIdGrpcClient from "../client/checkuserid.client.js";

export function grpcCheckUserId(email) {
  return new Promise((resolve, reject) => {
    try {
      checkUserIdGrpcClient.checkUserId({ email}, (err, res) => {
        if (err) {
          console.log("error from the grpc server", err);
          return reject(
            {
              code:13,
              message:err.message,
            }
          );
        }
        resolve(res);
      });
    } catch (error) {
      console.log("error in the grpc utilities", error);
      return resolve(
        {
          code:13,
          message:error.message,
        }
      );
    }
  });
}


