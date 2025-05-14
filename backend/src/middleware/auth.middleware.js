import { clerkClient } from "@clerk/express";

export const protectRoute=async(req, res, next)=>{
    if(!req.auth.user) return res.status(404).json({message: 'unauthorized - you must be logged in.'});
        next();

}
export const requireAdmin=async()=>{
    try{
        const currentUser= await clerkClient.users.getUser(req.auth.userId);
        const isAdmin=process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin) return res.status(403).json({message: 'Unauthorized - you must be admin'});
        next();
            


    }catch(e){
        return next({message: e})

    }
}