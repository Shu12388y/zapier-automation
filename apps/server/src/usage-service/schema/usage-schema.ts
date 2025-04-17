import mongoose from "mongoose";
const UsageSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    totalApiCalls:{
        type:Number
    },
},{timestamps:true});

export const Usage = mongoose.models.Usage || mongoose.model("Usage",UsageSchema);