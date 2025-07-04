import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import path from "path";
import { services } from "../function/checkUserId.services.js";
import { config } from "dotenv";
config();

const serverPort = process.env.GRPC_CHECK_USERID_SERVER_PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
    path.join(__dirname, "../../proto/checkUserId.proto"),
    {}
);

const proto = grpc.loadPackageDefinition(packageDefination);

export function startServer() {
    try {
        const server = new grpc.Server();
        server.addService(
            proto.checkUserIdPackage.checkUserIdService.service,
            services
        );
        server.bindAsync(
            `0.0.0.0:${serverPort}`,
            grpc.ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    console.error("gRPC server failed to start:", err);
                    process.exit(-1);
                }
                console.log(`gRPC server running on port ${port}`);
            }
        );
    } catch (error) {
        console.log("error in starting the server", error);
        process.exit(-1);
    }
}