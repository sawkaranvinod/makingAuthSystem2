import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import {config} from "dotenv";
import {fileURLToPath} from "url";
import path from "path";
config();

const grpcServerSendOtpUrl = process.env.GRPC_SERVER_SEND_OTP_URL || "localhost:3001";

const __filename  = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
    path.join(__dirname,"../../proto/sendOtp.proto"),
    {},
);

const proto = grpc.loadPackageDefinition(packageDefination);

export const sendOtpClient = new proto.sendOtpPackage.sendOtpService(
    grpcServerSendOtpUrl,
    grpc.credentials.createInsecure()
);