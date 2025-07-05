import fastify from "fastify";
import {config} from "dotenv";
import {masterRouter} from "./routes/master.route.js";
config();

const port = process.env.FASTIFY_VERIFY_OTP_LOGIN_SERVER_PORT || 8006;
const app = fastify();

app.register(masterRouter,{prefix:"api/v1/"});

app.listen(
    {port},
    (err,address)=>{
        if (err) {
            console.log("error in the starting the fastify server",err.message);
            process.exit(-1);
        };
        console.log(`server started at ${address} and localhost:${port}`);
    }
)