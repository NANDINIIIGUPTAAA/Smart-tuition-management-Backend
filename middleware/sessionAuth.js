module.exports=(req,res,next)=>{
    if(!req.session.getemp){
        console.log(req.session.getemp)
        return res.status(401).json({loggedIn:false});
    }
    next();
}