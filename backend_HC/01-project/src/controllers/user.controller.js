import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiErrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"


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

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }


    //upload the images on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400, "Avatar file didn't get upload on cloudinary")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshTokens"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser , "User regsitered successfully!")
    )
})

export {registerUser}