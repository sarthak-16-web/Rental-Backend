export const isAdmin = (req,res,next)=>{
    if(!req.session.adminId){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }

    next();
}