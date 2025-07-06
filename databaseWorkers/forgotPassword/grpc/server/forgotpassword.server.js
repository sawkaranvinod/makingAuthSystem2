import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import {config} from "dotenv";
import path from "path";
import {forgotPasswordServices} from "../service/forgotPassword.services.js";
config();
const grpcForgotPasswordServerPort = process.env.GRPC_FORGOT_PASSWORD_SERVER_PORT || 3005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/fotgotPassword.proto"),
    {},
);

const proto = grpc.loadPackageDefinition(packageDefination);

export function startServer() {
    try {
        const server = new grpc.Server();
        server.addService(proto.forgotpasswordPackage.forgotPasswordService.service,forgotPasswordServices);
        server.bindAsync(
            `0.0.0.0:${grpcForgotPasswordServerPort}`,
            grpc.ServerCredentials.createInsecure(),
        );
    } catch (error) {
        console.log("error in the starting the server of the grpc")
    }
}