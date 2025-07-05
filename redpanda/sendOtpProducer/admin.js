import { kafka,sendOtpTopic} from "./config/kafka.sendOtp.config.js";

export const admin = kafka.admin();
export async function connectAdmin() {
  await admin.connect();
  console.log("Kafka admin connected");

  // Create topic if it doesn't exist
  const topics = await admin.listTopics();
  if (!topics.includes(sendOtpTopic)) {
    await admin.createTopics({
      topics: [
        {
          topic: sendOtpTopic,
          numPartitions: 2,
        },
      ],
    });
    console.log(`Topic '${sendOtpTopic}' created with 2 partitions`);
  } else {
    console.log(`Topic '${sendOtpTopic}' already exists`);
  }
}

export async function disconnectAdmin() {
  await admin.disconnect();
  console.log("Kafka admin disconnected");
}

// Example usage
(async () => {
  await connectAdmin();
  await disconnectAdmin();
})();
