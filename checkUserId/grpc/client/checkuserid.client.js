import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import path from "path";
import {config} from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const checkUserIdServerUrl = process.env.GRPC_CHECK_USERID_SERVER_URL || "localhost:3000";


const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/checkUserId.proto"),
    {},
);

const proto = grpc.loadPackageDefinition(packageDefination);

const checkUserIdGrpcClient = new proto.checkUserIdPackage.checkUserIdService(
    checkUserIdServerUrl,
    grpc.credentials.createInsecure()
);

export default checkUserIdGrpcClient;
