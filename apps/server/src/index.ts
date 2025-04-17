import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});



import { DB_CONFIG } from "./utils/db-config";
import { app } from "./server";
import { usageCron } from "./crons/usage-cron";


DB_CONFIG()
  .then(() => {
    usageCron()
    app.listen(process.env.PORT, () => {
      console.log("server is on");
    });
  })
  .catch((e) => {
    console.log(e);
  });
