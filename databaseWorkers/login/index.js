import {connectDB} from "./database/connection.db.js";
import {startServer} from "./grpc/server/login.server.js";
import {config} from "dotenv";
config();
 
const dbUrl = process.env.MONGO_DB_URL || "mongodb://karan:Kumar1234@localhost:27017/auth?authSource=admin"
;(async () => {
    try {
        await connectDB(dbUrl);
        startServer();
        console.log("database is connected sucessfully")
    } catch (error) {
        console.log("error in the high order function of the index file",error.message);
        process.exit(-1);
    }
})();