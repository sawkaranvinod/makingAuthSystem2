import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {fileURLToPath} from "url";
import path from "path";
import {config} from "dotenv";
config();


const grpcUpdatePersonalDetailServerurl = process.env.GRPC_UPDATE_PERSONAL_DETAIL_SERVER_URL || "localhost:3005";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/updatePersonalDetail.proto"),
    {},
);

const proto = grpc.loadPackageDefinition(packageDefination);

export const updatePersonalDetailClient = new proto.updatePersonalDetailPackage.updatePersonalDetailService(
    grpcUpdatePersonalDetailServerurl,
    grpc.credentials.createInsecure(),
);