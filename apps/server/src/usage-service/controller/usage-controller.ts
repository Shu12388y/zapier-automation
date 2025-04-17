import { Response, Request } from "express";
import { redisClient } from "../../utils/redis-config";

export class UsageController {
  static async usage(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await redisClient.get(`id:${id}`);
      res.json({ message: data });
    } catch (error) {
      res.json({ message: "Internal Server Error" });
    }
  }
  static async usageCost(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await redisClient.get(`id:${id}`);
      const calculateCost = (await (parseInt(data as string) || 0)) * 0.75;
      res.status(200).json({ message: calculateCost });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
