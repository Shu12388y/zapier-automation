import { Response, Request } from "express";
import { User } from "../schema/auth-schema";
import { notifyZapier } from "../../zapier-service/zapier-service";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const data = await req.body;
      if (!data) {
        res.status(404).json({ message: "Empty body" });
      }

      const registerNewUser = await new User(data);
      await registerNewUser.save();

      res.status(201).json({ message: "CREATED" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async upgradePlan(req: Request, res: Response) {
    try {
      const id = await req.params.email;
      if (!id) {
        res.status(409).json({ message: "Empty params object" });
      }
      // @ts-ignore
      const finduser = await User.findOne({ email: id });

      if (!finduser) {
        res.json(404).json({ message: "User not exist" });
      }

      // @ts-ignore
    await User.findOneAndUpdate(
        { email: id },
        {
          plan: "paid",
          apiLimit: 20,
          subscribedUser: true,
        }
      );

      res.status(200).json({ message: "Plan Upgrade" });

    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });

    }
  }

 

}
