import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User} from "../models/user.model.js"

const registerUser = asyncHandler( async (req,res)=>{
       //get details of user
       //check user details & validation not empty
       //check user exist or not from email and username
       //create user object - create entry in db
       //remove password and refresh token from result
       //check for creation
       //return response

       const {username,email,name,password} =req.body
       console.log(username,email,name,password);
       

       if (
        [name, email, username, password].some((field) => field?.trim() === "")
        ) {
        throw new ApiError(400, "All fields are required")
        }

        const existedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }

        const user = await User.create({
            name,
            email, 
            password,
            username
        })
        console.log(user);
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
    
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
})


export {registerUser}