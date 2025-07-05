import Redis from "ioredis";
import {config} from "dotenv";


const redisTempUserDataPort = process.env.REDIS_TEMP_DATA_PORT || 6379;

export const redisTempUserData = new  Redis(redisTempUserDataPort);