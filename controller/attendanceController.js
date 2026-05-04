const attend=require('../models/attendancemodel')
const User=require('../models/userModel')

exports.getStudentattendanc=async(req,res)=>{
    let today=new Date()
    let date11=today.toISOString().split('T')[0]
    const attendee=await attend.aggregate([
        {
            $match:{
                date1:date11
            }
        },
        {
            $sort:{
                attendance:-1
            }
        },{
            $lookup:{
                from:"user1",
                localField:"email",
                foreignField:"email",
                as:"User"
            }
        },
        {
            $project:{
                "User.name":1,
                "User.EmployeId":1,
                email:1,
                date1:1,
                status:1
            }
        }
    ]);
    res.json(attendee)
}
exports.delete=async(req,res)=>{
    await attend.findByIdAndDelete(req.params.id);
    // console.log(req.params.id);
    return res.status(201).json({message:"Deleted"});
}
exports.update=async(req,res)=>{
    // console.log(req.body)
    await attend.findByIdAndUpdate(req.params.id,req.body,{new:true})
    return res.status(201).json({message:"Updated"})
};
exports.getAttendancebydate=async(req,res)=>{
    const recordfind=await attend.aggregate([
        {
            $match:{
                date1:req.params.date
            }
        },
        {
            $sort:{
                attendance:-1
            }
        },{
            $lookup:{
                from:"user1",
                localField:"email",
                foreignField:"email",
                as:"User"
            }
        },
        {
            $project:{
                "User.name":1,
                "User.EmployeId":1,
                email:1,
                date1:1,
                status:1
            }
        }
    ]);
    res.json(recordfind)
}
exports.getAttendancebyemail=async(req,res)=>{
    // console.log(req.params.email)
    const recordfind=await attend.aggregate([
        {
            $match:{
               email:req.params.email
            }
        },
        {
            $lookup:{
                from:"user1",
                localField:"email",
                foreignField:"email",
                as:"user"
            }
        },
        {
            $project:{
                "user.name":1,
                "user.EmployeId":1,
                email:1,
                date1:1,
               status:1
            }
        }
    ]);
    console.log(recordfind)
    res.json(recordfind)
}
exports.getAttendancebystatus=async(req,res)=>{
      console.log("STATUS RECEIVED IN API:", req.params.status);
    const recordfind=await attend.aggregate([
          {
            $match:{
                status:req.params.status
            }
        },
         {
            $lookup:{
                from:"user1",
                localField:"email",
                foreignField:"email",
                as:"user"
            }
        },
      
       
        {
            $project:{
                "user.name":1,
                "user.EmployeId":1,
                email:1,
                date1:1,
                status:1
            }
        }
    ]);
    // console.log(recordfind)
    res.json(recordfind)
}

exports.getUser=async(req,res)=>{
    console.log(req.session.getemp)
    const user1=await attend.find({email:req.session.getemp.email});

    res.json(user1)
}

