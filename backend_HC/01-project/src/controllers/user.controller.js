import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiErrors.js"
import {User} from "../models/user.model.js"


const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user alreday exists: username & email
    // check for images , check for avatar (both are file uploads to our backend server)
    // upload them to cloudinary , get the URL back
    // create user object - create entry in DB
    // remove password and refresh token fields from response
    // check for user creation( whether the user was actually created or not)
    // if yes then return the response to the frontend


    const {fullName, email, username, password} = req.body
    console.log(fullName, email, username, password)

    // if (fullName === "" ){
    //     throw new ApiError(400 , "fullname is required")
    // }

    if ([fullName, email, username, password].some((field)=>{
        return field?.trim() === ""
    })) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [ { username } , { email } ]
    })

    if (existedUser) {
        throw new ApiError(409, "User with the following userName and Email already exists!")
    }

})

export {registerUser}