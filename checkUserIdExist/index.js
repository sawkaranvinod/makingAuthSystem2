import fastify from "fastify";
import {config} from "dotenv";
import {masterRouter} from "./routes/master.route.js";
config();


const port = process.env.FASTIFY_CHECK_USER_ID_EXIST_PORT || 8004;
const app = fastify();


app.register(masterRouter,{prefix:"/api/v1"});

app.listen(
    {port},
    (err,address)=>{
        if (err) {
            console.log("error in starting fasgify server",err);
            process.exit(-1);
        };
        console.log(`server started at ${address} or localhost:${port}`);
    }
)
