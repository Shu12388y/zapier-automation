import mongoose from "mongoose";
const BillInfoSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    totalCost: {
      type: Number,
    },
    totalApiCalls: {
      type: Number,
    },
    plan: {
      type: String,
    },
    paymentstatus: {
      type: String,
    },
    billMonth: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Bill =
  mongoose.models.Bill || mongoose.model("Bill", BillInfoSchema);
