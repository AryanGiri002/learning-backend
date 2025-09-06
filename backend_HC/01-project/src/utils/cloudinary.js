import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


// --- START DEBUGGING BLOCK ---
console.log("--- Checking Cloudinary Environment Variables ---");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded and ready" : "!!! NOT LOADED !!!");
console.log("---------------------------------------------");
// --- END DEBUGGING BLOCK ---

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        // On success, we still clean up the file
        fs.unlinkSync(localFilePath)
        return response;
        
    } catch (error) {
        // THIS IS THE MOST IMPORTANT PART FOR DEBUGGING
        console.error("!!! CLOUDINARY UPLOAD ERROR !!!:", error); 
        
        // Clean up the file if the upload failed
        fs.unlinkSync(localFilePath)    
        return null;
    }
}

export {uploadOnCloudinary}