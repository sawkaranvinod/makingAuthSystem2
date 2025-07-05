import fastify from "fastify";
import {masterRouter} from "./routes/master.route.js";
import {config} from "dotenv";
config();

const app = fastify();
const port = process.env.FASTIFY_VERIFY_OTP_REGISTER_PORT || 8002;
app.register(masterRouter,{prefix:"/"});


app.listen(
    {port},
    (err,address)=>{
        if (err) {
            console.log("error in the main index function of the server",err.message);
            process.exit(-1);
        };
        console.log(`server started at the ${address} and localhost:${port}`);
    }
)