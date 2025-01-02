const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getUserProfile=asyncHandler(async(req,res)=>{
    try {
            const {id}=req.params;
            const user=await User.findOne({auth0Id:id});
            if(!user) {
                return res.status(404).json({message:"User Not Found"});
            }
            return res.status(200).json(user);
    } catch (error) {
        console.log("Error getting the user "+error.message);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
});
module.exports=getUserProfile;