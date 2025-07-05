import Fastify from "fastify";
import { config } from "dotenv";
import masterRouter from "./routes/master.route.js";
config();
const app = Fastify();
const port = process.env.FASTIFY_CHECK_USERID_PORT || 8000;

app.register(masterRouter, { prefix: "/" });

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`server is running at ${address} or localhost:${port}`);
});
