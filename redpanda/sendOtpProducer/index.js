import {producer} from "./config/kafka.sendOtp.config.js";
import {startServer} from "./grpc/server/sendOtp.server.js";

;(async ()=>{
    try {
        await producer.connect();  
        startServer();
        console.log("server is started");
    } catch (error) {
        console.log("error in the main function of the index",error.message);
        await producer.disconnect();
        process.exit(-1);
    }
})();