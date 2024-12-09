import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        if (newUser) {
            //generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// const updateProfile = async (req, res) => {
//     try {
//         const { profilePic } = req.body;
//         const userId = req.user._id; //bcuz of this - req.user = user -- in auth.middleware.js

//         if (!profilePic) {
//             return res.status(400).json({ message: "Profile pic is required" });
//         }

//         const uploadRes = await cloudinary.uploader.upload(profilePic)
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { profilePic: uploadRes.secure_url },
//             { new: true },
//         );

//         res.status(200).json(updatedUser)
//     } catch (error) {
//         console.log("error in update profile:", error);
//         res.status(500).json({message: "Internal server error"})
//     }
// }

// const updateProfile = async (req, res) => {
//     try {
//         const { profilePic } = req.body;
//         const userId = req.user._id;

//         if (!profilePic) {
//             return res.status(400).json({ message: "Profile pic is required" });
//         }

//         // Validate image format
//         if (!profilePic.startsWith('data:image')) {
//             return res.status(400).json({ message: "Invalid image format" });
//         }

//         // Check file size (approximate calculation for base64)
//         const base64Len = profilePic.replace(/^data:image\/\w+;base64,/, '').length;
//         const fileSize = (base64Len * 3) / 4;
//         if (fileSize > 10 * 1024 * 1024) { // 10MB limit
//             return res.status(400).json({ message: "Image size too large. Please upload an image less than 10MB" });
//         }

//         console.log("Starting Cloudinary upload...");

//         const uploadRes = await cloudinary.uploader.upload(profilePic, {
//             timeout: 60000,
//             resource_type: "auto",
//             folder: "profile_pics",
//         });

//         console.log("Cloudinary upload successful");

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { profilePic: uploadRes.secure_url },
//             { new: true },
//         );

//         res.status(200).json(updatedUser)
//     } catch (error) {
//         console.log("Error in update profile:", error.message);
//         console.log("Error stack:", error.stack);

//         if (error.http_code === 499) {
//             return res.status(408).json({ message: "Upload timeout - please try with a smaller image" });
//         }

//         res.status(500).json({ message: "Internal server error" })
//     }
// }



const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        // Validate image format
        if (!profilePic.startsWith('data:image')) {
            return res.status(400).json({ message: "Invalid image format" });
        }

        // Check file size (approximate calculation for base64)
        const base64Len = profilePic.replace(/^data:image\/\w+;base64,/, '').length;
        const fileSize = (base64Len * 3) / 4;
        if (fileSize > 10 * 1024 * 1024) { // 10MB limit
            return res.status(400).json({ message: "Image size too large. Please upload an image less than 10MB" });
        }

        console.log("Starting Cloudinary upload...");

        const uploadRes = await cloudinary.uploader.upload(profilePic, {
            timeout: 60000,
            resource_type: "auto",
            folder: "profile_pics",
        });

        console.log("Cloudinary upload successful");

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadRes.secure_url },
            { new: true },
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in update profile:", error.message);
        console.error("Error stack:", error.stack);

        if (error.name === "Error" && error.message.includes("timeout")) {
            return res.status(408).json({ message: "Upload timeout - please try with a smaller image" });
        }

        if (error.http_code) {
            return res.status(error.http_code).json({ message: error.message });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};




const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth Controller:", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export { signup, login, logout, updateProfile, checkAuth }