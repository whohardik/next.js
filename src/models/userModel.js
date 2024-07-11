 import { verify } from "crypto";
import mongoose from "mongoose";
import { type } from "os";
 
 const userSchema= new mongoose.Schema({
username:{
    type:String,
    required:[true,"Please provide a username"],
    unique:true,
    trim:true
},

password:{
    type:String,
    required:[true,"Please provide a password"],
 
}
,
email:{ 
    type:String,
    required:[true,"Please provide a email"],
    unique:true,
    trim:true
},
isVerfied:{
    type:Boolean,
    default:false 
}
,
isAdmin:{
    type:Boolean,
    default:false
},
forgotPasswordToken:String,
forgotPasswordExpiry:Date,
verifyToken:String,
verifyTokenExpiry:String

 })

 const User= mongoose.models.users|| mongoose.model("users",userSchema);
 export default User;