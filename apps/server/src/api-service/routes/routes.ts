import { Router } from "express";
import { APIController } from "../controller/api-controller";

export const apiRouter:Router = Router();



apiRouter.get("/service",APIController.getRandomCrypto);