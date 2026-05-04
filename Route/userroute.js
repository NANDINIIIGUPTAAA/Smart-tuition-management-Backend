const express = require("express");
const sessionAuth=require('../middleware/sessionAuth');
const usercontroller=require('../controller/userController')
const attendancecontroller=require('../controller/attendanceController')
const notificationController=require('../controller/notificatonController');
const forgetpasswordController=require('../controller/forgetpasswordController');
const feescontroller=require('../controller/feesController');
const router = express.Router();


router.get('/getstudent',sessionAuth,usercontroller.getstudent);
router.post('/login',usercontroller.userlogin);
router.post('/changepassword',usercontroller.changepassword);
router.post('/logout1',usercontroller.logout1);
router.get('/getstudentattend',attendancecontroller.getUser);

router.get('/getnotification',notificationController.getnotification);

router.get('/getuserfee',feescontroller.getuserfee);

router.post('/sendotp',forgetpasswordController.sendotp);
router.post('/forgetpassword',forgetpasswordController.forgetpassword);
module.exports = router;
