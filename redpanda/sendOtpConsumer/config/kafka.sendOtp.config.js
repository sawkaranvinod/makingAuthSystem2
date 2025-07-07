import { Kafka } from "kafkajs";
import { config } from "dotenv";
config();

const kafkaBrocker = process.env.KAFKA_BROKER || "localhost:9092";
const kafkaClientId = process.env.KAFKA_CLIENT_ID || "send-otp-producer";
export const sendOtpTopic = process.env.SEND_OTP_TOPIC;

const kafka = new Kafka({
  clientId: kafkaClientId,
  brokers: [kafkaBrocker],
});

export const producer = kafka.producer();

