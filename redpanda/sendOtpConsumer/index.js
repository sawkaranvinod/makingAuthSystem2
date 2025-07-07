import { config } from "dotenv";
import { sendEmail } from "./helper/sendOtp.helper.js";
config();

import { redpandaConsumer } from "../config/redpanda.config.js";

async function startConsumer() {
    await redpandaConsumer.connect();
    await redpandaConsumer.subscribe({ topic: process.env.REDPANDA_TOPIC || "send-otp", fromBeginning: true });

    await redpandaConsumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const data = await JSON.parse(message.value.toString());
                await sendEmail(data.to, data.subject, data.otp);
            } catch (error) {
                console.error("Error processing message:", error.message);
            }
        },
    });
}

startConsumer();