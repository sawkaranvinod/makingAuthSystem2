import Redis from "ioredis";
import {config} from "dotenv";
config();

const reserveUserIdPort = process.env.RESERVER_USERID_REDIS_PORT || 6379;
export const reserveData = new Redis(reserveUserIdPort);