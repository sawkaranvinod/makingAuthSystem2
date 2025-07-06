import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {config} from "dotenv";
import {fileURLToPath} from "url";
import path from "path";
config();

const grpcForgotPasswordServerUrl = process.env.GRPC_FORGOT_PASSWORD_SERVER_URL || "localhost:3005";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/forgotPassword.proto"),
    {},
);

const proto = grpc.loadPackageDefinition(packageDefination);

export const forgotPasswordClient = new proto.forgotPasswordPackage.forgotPasswordService(
    `${grpcForgotPasswordServerUrl}`,
    grpc.credentials.createInsecure(),
);

