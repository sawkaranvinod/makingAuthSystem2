import fastify from "fastify";
import {config} from "dotenv";
import {masterRouter} from "./routes/master.route.js"
config();

const app = fastify();
const port = process.env.FASTIFY_REGISTER_SERVER_PORT || 8001;
app.register(masterRouter,{prefix:"/"});

app.listen({port},(err,address)=>{
    if (err) {
        console.log("error in the starting fastify server",err.message);
        process.exit(-1);
    };
    console.log(`sever started at ${address} or localhost:8001`)
})

