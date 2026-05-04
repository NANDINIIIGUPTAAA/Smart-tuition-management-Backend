const user=require('../models/userModel')
const Admin=require('../models/adminModel');
const bcrypt=require('bcryptjs');
const { findOne } = require('../models/attendancemodel');

exports.getstudent=async(req,res)=>{
    console.log("hello")
    const users=await user.find({email:req.session.getemp.email});
     res.json({alldata:users,loggedIn:true})
}

exports.userlogin=async(req,res)=>{
    const{email,password}=req.body;
    const getemp=await user.findOne({email})
    if(!getemp){
        return res.status(400).json({message:"User not found"})
    }
    if(getemp.enable1=="no"){
        return res.status(400).json({message:"Students Account is disabled! Contact to adminstrator"})
    }
    const passMatched=await bcrypt.compare(password,getemp.password);
    console.log(passMatched)
    if(!passMatched){
        return res.status(400).json({message:"Invalid Password"})
    }
    
    req.session.getemp={
        id:getemp._id,
        email:getemp.email,
        name:getemp.name,
        EmployeId:getemp.EmployeId
    };
    // console.log(req.session.getemp.EmployeId),
    res.status(200).json({message:"Login Successful",user:req.session.getemp})
}

exports.logout1=async(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie("login-session");
        res.json({loggedOut:true})
    })
}
exports.changepassword = async (req, res) => {
    try {
        const {spassword1, newpassword1} = req.body;
        const getUser = await user.findOne({email:req.session.getemp.email});
        if (!getUser) {
            return res.status(400).json({ message: "User not found" });
        }
    
        const passMatched = await bcrypt.compare(spassword1, getUser.password);
        if (!passMatched) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(newpassword1, 10);
        getUser.password = hashedPassword;
        getUser.changepassword="yes"
        await getUser.save();

        res.status(200).json({ message: "Password changed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
    
