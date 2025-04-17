import cron from "node-cron";
import { User } from "../auth-service/schema/auth-schema";
import { Usage } from "../usage-service/schema/usage-schema";
import { redisClient } from "../utils/redis-config";

export function usageCron() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const getAllKeys = await redisClient.keys("id:*");

      for (const key of getAllKeys) {
        const email = key.replace("id:", "");
        // @ts-ignore
        const findUser = await User.findOne({ email });

        if (!findUser) {
          console.warn(`No user found with email: ${email}`);
          continue;
        }

        const apiUsage = await redisClient.get(key);
        if (!apiUsage) continue;

        const totalCalls = parseInt(apiUsage);

        // @ts-ignore
        // Update if exists, else create new (based on user id and date)
        await Usage.findOneAndUpdate(
          {
            userid: findUser._id,
          },
          {
            $set: { userid: findUser._id, date: new Date().toDateString() },
            $inc: { totalApiCalls: totalCalls },
          },
          { upsert: true, new: true }
        );
      }

      console.log("Daily usage synced with MongoDB");
    } catch (error) {
      console.error("Cron job error:", error);
    }
  });
}
