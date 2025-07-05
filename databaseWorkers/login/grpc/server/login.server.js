import grpc from '@grpc/grpc-js';
import protoLoader from "@grpc/proto-loader";
import {config} from "dotenv";
import {fileURLToPath} from "url";
import path from 'path';
import {loginServices} from "../services/login.services.js";
config();
const grpcLoginServerPort = process.env.GRPC_LOGIN_SERVER_PORT || 3004;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/login.proto"),
    {},
);
const proto = grpc.loadPackageDefinition(packageDefination);

export function startServer() {
    try {
        console.log("server starting");
        const server = new grpc.Server();
        server.addService(proto.loginPackage.loginService.service, loginServices);
        server.bindAsync(
            `0.0.0.0:${grpcLoginServerPort}`,
            grpc.ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    console.log("error in the starting the server of the grpc", err.message);
                    process.exit(-1);
                }
                console.log(`gRPC login server running on port ${port}`);
            }
        );
    } catch (error) {
        console.log("error in the starting the server of the grpc",error.message);
        process.exit(-1);
    }
}