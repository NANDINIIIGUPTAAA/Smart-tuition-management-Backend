const mongoose=require('mongoose')
const feesSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    date2:{
        type:Date,
        default:Date.now
    },
      paymentmode: {
        type: String,
        required: true,
        enum: ["Cash", "UPI", "Card", "Bank Transfer"]
    },
    paidfee:{
        type: Number,
        required: true
    },
    duedate:{
        type:Date
    },
    User:{
       type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})
module.exports=mongoose.model("fees",feesSchema);