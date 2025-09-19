import { asyncHandler } from "../utils/async-handler.js";
const registerUser = asyncHandler(async (req,res)=>{
     const {email, password, username,role} = req.body

    //  validation
     if(!email || !password || !username || !role){
        throw new Error("All fields are required")
     }
     if(password.length < 8){
        throw new Error("Password must be at least 6 characters")
     }

})

export {registerUser}