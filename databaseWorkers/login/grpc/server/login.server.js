import grpc from '@grpc/grpc-js';
import protoLoader from "@grpc/proto-loader";
import {config} from "dotenv";
import {fileURLToPath} from "url";
import path from 'path';
import {loginServices} from "../services/login.services.js";
