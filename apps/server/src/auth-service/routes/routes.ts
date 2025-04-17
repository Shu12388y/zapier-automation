import { Router } from "express";
import { AuthController } from "../controller/auth-controller";

export const authRouter:Router = Router()


authRouter.post("/auth",AuthController.signup);
authRouter.put("/upgrade/:email",AuthController.upgradePlan);
