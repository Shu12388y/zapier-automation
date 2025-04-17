import { Router } from "express";
import { UsageController } from "../controller/usage-controller";

export const usageRouter: Router = Router();

usageRouter.get("/usage/:id", UsageController.usage);
usageRouter.get("/cost/:id",UsageController.usageCost);