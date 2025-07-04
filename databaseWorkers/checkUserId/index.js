import { startServer } from "./grpc/server/checkUserId.grpc.js";
import { connectDB } from "./database/connection.db.js";
import { config } from "dotenv";
config();

const dbUrl = process.env.MONGO_DB_URL || "mongodb://karan:Kumar1234@localhost:27017/auth?authSource=admin";

(async () => {
  try {
    await connectDB(dbUrl);
    startServer();
    console.log("Server and database started successfully");
  } catch (error) {
    console.log("error in entering in the server", error.message);
    process.exit(-1);
  }
})();
