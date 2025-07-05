import fastify from "fastify";
import { config } from "dotenv";
import { masterRouter } from "./routes/master.route.js";


config();

const app = fastify();
const port = process.env.FASTIFY_LOGIN_PORT || 8003;
app.register(masterRouter, { prefix: "/" });

app.listen({ port }, (err, address) => {
  if (err) {
    console.log("Error starting login server:", err.message);
    process.exit(-1);
  }
  console.log(`Login server started at ${address} and localhost:${port}`);
});