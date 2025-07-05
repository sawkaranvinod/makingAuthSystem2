import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import path from "path";
import {config} from "dotenv";
config();

const grpcRegisterServerUrl = process.env.GRPC_REGISTER_SERVER_URL || "localhost:3002";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/register.proto"),
    {},
);

const proto = grpc.loadPackageDefinition(packageDefination);

export const registerClient = new proto.registerPackage.registerService(
    grpcRegisterServerUrl,
    grpc.credentials.createInsecure(),
);