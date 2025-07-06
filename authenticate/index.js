import fastify from "fastify";
import { masterRouter } from "./routes/master.route.js";
import { config } from "dotenv";
config();

const app = fastify();
const port = process.env.FASTIFY_AUTHENTICATE_PORT || 8001;

app.register(masterRouter, { prefix: "/api/v1" });

app.listen({ port }, (err, address) => {
    if (err) {
        console.log("error in the main index function of the server", err.message);
        process.exit(-1);
    }
    console.log(`server started at ${address} and localhost:${port}`);
});