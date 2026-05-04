const express=require('express');
const sessionAuth=require('../middleware/sessionAuth');
const adminController=require('../controller/adminController');
const attendanceController=require('../controller/attendanceController')
const notificationController=require('../controller/notificatonController');
const router=express.Router();

router.get('/getstudent',sessionAuth,adminController.getRegisterPage);
router.post('/createstudent',adminController.createuser);
router.delete('/delete/:id',adminController.deleteAdmin);
router.put('/update/:id',adminController.updateAdmin);
router.post('/login',adminController.adminlogin);
router.post('/attendance',adminController.markAttendance);
router.post('/logout',adminController.logout);
router.post('/disable1',adminController.disable1);

router.delete('/deleteattend/:id',attendanceController.delete);
router.put('/updateattend/:id',attendanceController.update);
router.get('/getattendance/',attendanceController.getStudentattendanc);
router.get('/getattendancebydate/:date',attendanceController.getAttendancebydate);
router.get('/getattendancebyemail/:email',attendanceController.getAttendancebyemail);
router.get('/getattendancebystatus/:status',attendanceController.getAttendancebystatus);

router.post('/createnotification',notificationController.createnotification);
router.post('/getnotification',notificationController.getnotification);
module.exports=router;