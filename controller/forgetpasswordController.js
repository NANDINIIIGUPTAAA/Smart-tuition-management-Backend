const forgetpassword=require('../models/userModel');
const bcrypt=require('bcryptjs');
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await forgetpassword.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;

        await user.save();

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "OTP for password reset",
                html: `<h1>OTP for password reset</h1>
                       <h3>Your OTP is: ${otp}</h3>`
            });

            return res.status(200).json({
                message: "OTP sent to email"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "OTP email failed"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.forgetpassword=async(req,res)=>{
    try{
        const{email,otp,newPassword}=req.body;
        const user =await forgetpassword.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(user.otp != otp){
            return res.status(400).json({message:"Invalid OTP"});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        await user.save();
        return res.status(200).json({message:"Password reset successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}