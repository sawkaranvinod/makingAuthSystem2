import Redis from "ioredis";
import {config} from "dotenv";
config();
const redisReserverUserDataPort = process.env.REDIS_RESERVER_USER_DATA_PORT || 6379;
export const redisReserveUserData = new Redis(redisReserverUserDataPort);