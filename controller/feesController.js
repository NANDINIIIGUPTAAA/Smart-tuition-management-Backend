const Fees=require('../models/feesModel');
const User=require('../models/userModel');

exports.getfees= async(req,res)=>{
    const { email } = req.query;
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ message: "User not found" });
    res.json({
        totalfee: user.totalfee || 0,
        paidfee: user.paidfee || 0,
        name: user.name || "",
        email: user.email
    });
}
exports.savefees=async(req,res)=>{
    const {email,paidfee,paymentmode,duedate}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    const totalfee=user.totalfee;
    const amount = parseInt(paidfee);
      if(isNaN(amount)){
            return res.status(400).json({ message: "Invalid fee amount" });
        }
    const newpaidfee=(user.paidfee || 0)+amount;
    if(newpaidfee>totalfee){
        return res.status(400).json({message:"Paid fee exceeds total fee"})
    }
    user.paidfee=newpaidfee;
    await user.save();
    const fees=new Fees({
        User:user._id,
        email:user.email,
        paidfee:amount,
        paymentmode:paymentmode,
        date2:new Date(),
        duedate:duedate
    });
    await fees.save();
    res.status(200).json({message:"Fees saved successfully",
    totalpaid: user.paidfee,  
    totalfee: user.totalfee
    });
}

exports.getuserfee=async(req,res)=>{
    const userfee=await Fees.find({email:req.session.getemp.email})
    console.log(userfee)
    res.json(userfee)
}
