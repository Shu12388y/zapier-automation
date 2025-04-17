import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  plan:{
    type:String,
    default:"free"
  },
  apiLimit:{
    type:Number,
    default:10
  },
  subscribedUser:{
    type:Boolean,
    default:false
  }
},{timestamps:true});


export const User  = mongoose.models.User || mongoose.model("User",UserSchema);

