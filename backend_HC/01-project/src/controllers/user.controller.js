import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiErrors.js" // Corrected filename casing
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js" // Corrected filename casing


const generateAccessAndRefreshTokens = async(userID) => {
    try {
        const user = await User.findById(userID)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500,"Someting went wrong while generating refresh and access token")
    }
}
const registerUser = asyncHandler(async (req, res) => {
    // --- DEBUGGING CHECKPOINT 1: See what the request contains ---
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    
    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(409, "User with the following userName or Email already exists!");
    }

    // --- DEBUGGING CHECKPOINT 2: Check if file paths are being extracted ---
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    
    console.log("Avatar Local Path:", avatarLocalPath);
    console.log("Cover Image Local Path:", coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // --- DEBUGGING CHECKPOINT 3: Attempt to upload and catch specific errors ---
    let avatar, coverImage;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
        if (coverImageLocalPath) {
            coverImage = await uploadOnCloudinary(coverImageLocalPath);
        }
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new ApiError(500, "Error during file upload to Cloudinary");
    }
    
    console.log("Cloudinary Avatar Response:", avatar);
    console.log("Cloudinary Cover Image Response:", coverImage);

    if (!avatar) {
        throw new ApiError(500, "Avatar file didn't get uploaded to Cloudinary");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select("-password -refreshTokens");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully!")
    );
});

const loginUser = asyncHandler(async (req,res)=>{
    // extract data from request body
    // username based (OR) email based access
    // find the user
    // check the password , if wrong then say that "password is incorrect" , if the entered pasword is correct , then generate the access token and refresh token & send it to user
    // send those tokens using secure cookies

    const {email, username , password} = req.body

    if (!username || !email){
        throw new ApiError(400, "username or email is required")
    }

    const user = User.findOne({
        $or: [{username},{email}]
    })

    if(!user){
        throw new ApiError(404, "User doesn't exists")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const{accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password - refreshToken")

    const options = {
        httpOnly: true,
        secure: ture
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {user:loggedInUser, accessToken, refreshToken}
        ),
        "User logged in Successfully"
    )
})

export { registerUser,loginUser };