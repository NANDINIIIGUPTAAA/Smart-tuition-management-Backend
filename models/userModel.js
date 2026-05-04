const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    EmployeId:{
        type:String,
        unique:true
    },
    name:String,
    email:{
        type:String,
        unique:true
    },
    phoneno:Number,
    password:{
        type:String,
        required:true
    },
    enable1:String,
    changepassword:String,
    totalfee:Number,
    paidfee:{
        type:Number,
        default:0
    },
    course:String,
    duration:Number,
    otp:Number,
    profilepic:String
  
});
module.exports=mongoose.model("user1",userSchema);