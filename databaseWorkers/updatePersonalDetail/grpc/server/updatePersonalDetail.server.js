import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { updatePersonalDetailServices } from '../services/updatePersonalDetail.services.js';

config();

const grpcUpdatePersonalDetailServerPort = process.env.GRPC_UPDATE_PERSONAL_DETAIL_SERVER_PORT || 3010;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageDefinition = protoLoader.loadSync(
    path.join(__dirname, '../../proto/updatePersonalDetail.proto'),
    {}
);
const proto = grpc.loadPackageDefinition(packageDefinition);

export function startServer() {
    try {
        console.log("UpdatePersonalDetail gRPC server starting");
        const server = new grpc.Server();
        // Adjust the following line to match your proto package and service names
        server.addService(proto.updatePersonalDetailPackage.updatePersonalDetailService.service, updatePersonalDetailServices);
        server.bindAsync(
            `0.0.0.0:${grpcUpdatePersonalDetailServerPort}`,
            grpc.ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    console.log("Error starting the updatePersonalDetail gRPC server:", err.message);
                    process.exit(-1);
                }
                console.log(`gRPC updatePersonalDetail server running on port ${port}`);
            }
        );
    } catch (error) {
        console.log("Error in starting the updatePersonalDetail gRPC server:", error.message);
        process.exit(-1);
    }
}