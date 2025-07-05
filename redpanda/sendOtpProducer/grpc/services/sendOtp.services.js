import { producer, sendOtpTopic } from "../../config/kafka.sendOtp.config.js";

export const sendOtpService = {
  sendOtp: async (call, callback) => {
    try {
      const {to, subject, data } = call.request;
      await producer.send({
        topic: sendOtpTopic,
        messages: [
          {
            value: JSON.stringify({to, subject, data }),
          },
        ],
      });
      callback(null, { sent: true });
    } catch (error) {
      console.log(
        "error in the function of the sendOtp services",
        error.message
      );
      callback({
        code: 13,
        message: "error in the sendotp service",
      });
    }
  },
};
