const express = require("express");
const sessionAuth=require('../middleware/sessionAuth');
const feescontroller=require('../controller/feesController');
const admincontroller=require('../controller/adminController');
const router=express.Router();
router.get("/getfees",feescontroller.getfees);
router.post("/savefees",feescontroller.savefees);
module.exports = router;
