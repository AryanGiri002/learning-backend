import {asyncHandler} from "../utils/asyncHandler.js"

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

})

export {registerUser}