import Redis from "ioredis";
import {config} from "dotenv";
config();

const hotDataPort = process.env.HOT_DB_REDIS_PORT;
const reserveUserIdPort = process.env.RESERVER_USERID_REDIS_PORT;
export const hotData = new Redis(hotDataPort);
export const reserveData = new Redis(reserveUserIdPort);