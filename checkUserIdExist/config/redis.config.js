import Redis from "ioredis";
import {config} from "dotenv";
config();
const redisReserveDataPort = process.env.REDIS_RESERVE_DATA_PORT || 6379;
export const redisReserveData = new Redis(redisReserveDataPort);