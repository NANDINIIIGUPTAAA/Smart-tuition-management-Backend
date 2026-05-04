const Admin=require('../models/adminModel');
const User=require('../models/userModel');
const Attendance=require('../models/attendancemodel')
const bcrypt=require('bcryptjs')
exports.getRegisterPage=async (req,res)=>{
    console.log(req.session.getemp)
    const admins=await User.find();
    res.json({data:admins,loggedIn:true,alldata:req.session.getemp})
};

exports.createuser=async (req,res)=>{
    try{
        const{EmployeId,email,phoneno,password}=req.body;
        const exist=await User.findOne({$or:[{EmployeId},{email},{phoneno}]});
        if(exist){
            if(exist.EmployeId==EmployeId){
                return res.status(400).json({message:"Employee ID already Exists"})
            }
            if(exist.email==email){
                return res.status(400).json({message:"Email already exists"})
            }
            if(exist.phoneno==phoneno){
                return res.status(400).json({message:"Phone Number already exists"})
            }
        }
        const hashed=await bcrypt.hash(password,10);
        const newAdmin=new User({...req.body,password:hashed,enable1:"yes",changepassword:"no"});
        await newAdmin.save();
        res.status(201).json({message:"Admin created successfully",admin:newAdmin})
    }
    catch(err){
        res.status(500).json({message:"Server Error",error:err.message});
    }
}
exports.deleteAdmin=async(req,res)=>{
      await User.findByIdAndDelete(req.params.id)
      res.json({message:"Admin deleted successfully"})
};

exports.updateAdmin=async(req,res)=>{
    const id=req.params.id; 
    await User.findByIdAndUpdate(id,req.body,{new:true});
    res.json({message:"Admin updated successfully"})
}
exports.adminlogin=async(req,res)=>{
    const{email,password}=req.body;
    const getemp=await Admin.findOne({email})
    if(!getemp){
        return res.status(400).json({message:"Admin not found"})
    }

    // const passMatched=await bcrypt.compare(password,getemp.password);
    if(getemp.password!=password){
        return res.status(400).json({message:"Invalid Password"})
    }

    req.session.getemp={
        id:getemp._id,
        email:getemp.email,
        name:getemp.name
    };
    res.status(200).json({message:"Login Successful",admin:req.session.getemp})
}

exports.disable1=async(req,res)=>{
    const{id,status}=req.body
    console.log(id)
    await User.findByIdAndUpdate(id,{enable1:status})
    res.json({message:"Disable successfully"})
}
exports.logout=async(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie("login-session");
        res.json({loggedOut:true})
    })
}
exports.markAttendance = async (req,res)=>{
    try{
        const {email, date1, status } = req.body;

        const attendance = new Attendance({
            email,
            date1,
            status
        });

        await attendance.save();

        res.json({ message:"Attendance saved successfully" });

    }catch(err){
        res.status(500).json({ message:"Error", error: err.message });
    }
};
