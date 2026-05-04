const mongoose=require('mongoose');
const attendanceSchema=new mongoose.Schema({
    email:{
        type:String,
    },
    date1:String,
    status:String
});
module.exports=mongoose.model("attendances",attendanceSchema);