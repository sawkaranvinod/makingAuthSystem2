import checkUserIdGrpcClient from "../client/checkuserid.client.js";

function grpcCheckUserId(email) {
  return new Promise((resolve, reject) => {
    try {
      checkUserIdGrpcClient.checkUserId({ email, ipAddress }, (err, res) => {
        if (err) {
          console.log("error from the grpc server", err);
          return resolve(null);
        }
        resolve(res);
      });
    } catch (error) {
      console.log("error in the grpc utilities", error);
      resolve(null);
    }
  });
}

export default grpcCheckUserId;
