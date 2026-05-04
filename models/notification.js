const mongoose=require('mongoose');
const notificationSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    notificationtype:String,
    message:String,
    date3:Date,
    status1:String
});
module.exports=mongoose.model("notification",notificationSchema);