import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {config} from "dotenv";
import {fileURLToPath} from "url";
import path from "path";
config();

const grpcLoginServerUrl = process.env.GRPC_LOGIN_SERVER_URL || "localhost:3003";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/login.proto"),
    {}
);

const proto = grpc.loadPackageDefinition(packageDefination);

export const loginClient = new proto.loginPackage.loginService(
    grpcLoginServerUrl,
    grpc.credentials.createInsecure(),
);