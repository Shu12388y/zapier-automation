import { Response, Request } from "express";
import { User } from "../../auth-service/schema/auth-schema";
import { Bill } from "../schema/billing-schema";
import { redisClient } from "../../utils/redis-config";
import { notifyZapier } from "../../zapier-service/zapier-service";
import { BillTemplate, InvoiceTemplate } from "../../emailtemplates/template";

export class BillingController {
  static async generateBill(req: Request, res: Response) {
    try {
      const id = req.params.id;
      // @ts-ignore
      const findUser = await User.findOne({ email: id });
      //    @ts-ignore
      const findUserBill = await Bill.findOne({
        userid: findUser._id,
      });

      const findTotalApiCalls = await redisClient.get(`id:${id}`);

      if (!findUserBill) {
        const generateNewBill = await new Bill({
          userid: findUser._id,
          totalCost: parseInt(findTotalApiCalls as string) * 0.57,
          totalApiCalls: parseInt(findTotalApiCalls as string),
          plan: findUser.plan,
          paymentstatus: "pending",
          billMonth: new Date().getMonth,
        });
        await generateNewBill.save();
      }

      //    @ts-ignore
      await Bill.findOneAndUpdate(
        {
          userid: findUser._id,
        },
        {
          totalCost: parseInt(findTotalApiCalls as string) * 0.57,
          totalApiCalls: parseInt(findTotalApiCalls as string),
          plan: findUser.plan,
          paymentstatus: "pending",
          billMonth: new Date().getMonth,
        }
      );

      const billTemplate = BillTemplate({
        firstname: findUser.firstname,
        email: findUser.email,
        apicalls: findTotalApiCalls?.toString() || "0",
        dueDate: `30.05.25`,
        price: "0.57",
        totalPrice: (parseInt(findTotalApiCalls as string) * 0.57).toString(),
      });

      await notifyZapier(findUser.email, "API Usage Billing", billTemplate);
      res.status(201).json({ message: "Bill Generated" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async payBill(req: Request, res: Response) {
    try {
      const id = req.params.id;
      // @ts-ignore
      const findUser = await User.findOne({ email: id });
      //   @ts-ignore
      const billInfo = await Bill.findOne({
        userid: findUser._id,
      });
      // @ts-ignore
      await Bill.findOneAndUpdate(
        { userid: findUser._id },
        { paymentstatus: "paid" }
      );

      const generateInvoice = InvoiceTemplate({
        firstname: findUser.firstname as string,
        email: findUser.email as string,
        apicalls: billInfo.totalApiCalls.toString(),
        price: "0.57",
        totalPrice: billInfo.totalCost.toString(),
      });

      await notifyZapier(findUser.email, "API INVOICE", generateInvoice);
         res.status(200).json({ message: "payement successfull" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
