import { config } from "dotenv";
import { connectDB } from "./database/connection.db.js";
import { startServer } from "./grpc/server/register.server.js";

config();

const dbUrl = process.env.MONGO_DB_URL || "mongodb://localhost:27017/auth?authSource=admin";

(async () => {
    try {
        await connectDB(dbUrl);
        startServer();
        console.log("Database connected and gRPC register server started.");
    } catch (error) {
        console.log("Error in starting register worker:", error.message);
        process.exit(-1);
    }
})();