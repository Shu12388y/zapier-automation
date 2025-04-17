import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { redisClient } from "./redis-config";
import { User } from "../auth-service/schema/auth-schema";
import { notifyZapier } from "../zapier-service/zapier-service";
import { APIUsageTemplate } from "../emailtemplates/template";

export const connection = new IORedis(process.env.REDIS_URI!,
  { maxRetriesPerRequest: null }
);

export const serviceQueue = new Queue("serviceQueue", { connection });

new Worker(
  "serviceQueue",
  async (job) => {
    try {
      // @ts-ignore
      const findUser = await User.findOne({ email: job.data.auth });
      if (!findUser) throw new Error("User not found");

      const key = `id:${job.data.auth}`;
      const findLimitRaw = await redisClient.get(key);
      const findLimit = parseInt(findLimitRaw || "0", 10);

      if (findLimit >= findUser.apiLimit) {
        const notifyedStatus = await redisClient.get(`notify:${job.data.auth}`);
        const apiTemplate = APIUsageTemplate({
          firstname: findUser.firstname,
          email: findUser.email,
          apicalls: findUser.apiLimit,
          cost: "0.75",
          plan: findUser.plan,
        });
        if (!notifyedStatus) {
          await notifyZapier(findUser.email, "API Limit Exceed", apiTemplate);
          await redisClient.set(`notify:${job.data.auth}`, 1);
          throw new Error("API limit exceeded.");
        } else {
          throw new Error("API limit exceeded.");
        }
      }

      if (!findLimitRaw) {
        await redisClient.set(key, 1, "EX", 2592000);
      } else {
        await redisClient.incr(key);
        await redisClient.expire(key, 2592000);
      }

      // Return success message if needed
      return { success: true };
    } catch (error: any) {
      // This will be caught in job.waitUntilFinished(...)
      throw new Error(error.message);
    }
  },
  {
    connection,
  }
);
