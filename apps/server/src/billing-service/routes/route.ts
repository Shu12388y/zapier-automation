import { Router } from "express";
import { BillingController } from "../controllers/billing-controller";

export const billRouter:Router = Router()


billRouter.get("/billing/:id",BillingController.generateBill);
billRouter.get("/invoice/:id",BillingController.payBill);