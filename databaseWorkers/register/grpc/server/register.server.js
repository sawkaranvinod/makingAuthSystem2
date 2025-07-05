import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import path from "path";
import {config} from "dotenv";
import {registerService} from "../service/register.services.js"
config();

const port = process.env.GRPC_REGISTER_SERVER_PORT || 3002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/register.proto"),
    {},
);
const proto = grpc.loadPackageDefinition(packageDefination);

export function startServer() {
    try {
        const server = new grpc.Server();
        server.addService(
            proto.registerService.service,
            registerService,
        );
        server.bind(
            `0.0.0.0:${port}`,
            grpc.ServerCredentials.createInsecure(),
        );
    } catch (error) {
        console.log("error in the staring the grpc server",error.message);
        process.exit(-1);
    }
}