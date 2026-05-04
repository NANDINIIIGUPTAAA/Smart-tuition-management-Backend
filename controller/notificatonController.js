const notification=require('../models/notification');
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

exports.getnotification=async(req,res)=>{
    const usernotify=await notification.find({email:req.session.getemp.email})
    res.json(usernotify)
    console.log(usernotify)
}
exports.createnotification = async (req, res) => {
    try {
        const { email, message, notificationtype, date3 } = req.body;

        const Notification = new notification({
            email,
            message,
            notificationtype,
            date3
        });

        await Notification.save();

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "test email",
                html: `<h1>${notificationtype}</h1>
                       <h3>${message}</h3>`
            });

            return res.status(200).json({
                message: "Notification created & email sent"
            });

        } catch (error) {
            console.log(error);

            return res.status(200).json({
                message: "Notification created but email failed"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
};