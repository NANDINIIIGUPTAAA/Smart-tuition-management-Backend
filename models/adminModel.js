const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
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
    }

});
module.exports=mongoose.model("admins",adminSchema);