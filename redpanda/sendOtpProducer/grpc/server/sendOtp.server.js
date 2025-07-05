import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import path from "path";
import { sendOtpService } from "../services/sendOtp.services.js";
config();

const port = process.env.GRPC_SEND_OTP_SERVER_PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefination = protoLoader.loadSync(
  path.join(__dirname, "../../proto/sendOtp.proto"),
  {}
);

const proto = grpc.loadPackageDefinition(packageDefination);

export function startServer() {
  try {
    const server = new grpc.Server();
    server.addService(
      proto.sendOtpPackage.sendOtpService.service,
      sendOtpService
    );
    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, bindPort) => {
        if (err) {
          console.log("error in the staring grpc Server", err.message);
          process.exit(-1);
        }
        console.log(`server is starting at localhost:${bindPort}`);
      }
    );
  } catch (error) {
    console.log("error in the staring grpc Server", error.message);
    process.exit(-1);
  }
}
