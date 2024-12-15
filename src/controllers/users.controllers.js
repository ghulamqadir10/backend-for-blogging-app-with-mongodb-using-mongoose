import usersModels from "../models/users.models.js";
import bcrypt from "bcrypt"
import jwt from "jasonwebtoken"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { register } from "module";

// upload image code

// cloudinary config




// access token
const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET, { expiresIn: "7h" })
}

// refresh token
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET, { expiresIn: "7d" })
}

const registerUser = async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        res.status(400).json({
            message: "email is required"
        })
    }
    if (!password) {
        res.status(400).json({
            message: "password is required"
        })
    }

    const user = usersModels.findOne({
        email: email
    })
    if (user) {
        res.json(400).json({
            message: "email is already registered"
        })
    }
    try {
        const createUser = usersModels.create({
            email, password
        })
        await createUser.save()
        res.status(400).json({
            message: "user registered successfully",
            registerUser,
            email,
            password,

        })
    }
    catch (err) {
        res.status(500).json({
            message: "error is occurring while registering",
        });
    }
}



// loginUser
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await usersModels.findOne({
        email: email,
    });
    if (!user) {
        res.status(400).json({
            message: "user not found",
        });
    } else {
        if (!email) {
            res.status(400).json({
                message: "email is required",
            });
        }
        if (!password) {
            res.status(400).json({
                message: "email is required",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({
                message: "invalid password"
            })
        }
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    res.cookie("refreshToken", refreshToken, { http: true, secure: false });

    res.json({
        message: "user logedin successfully",
        accessToken,
        refreshToken,
        data: user
    })
};

// logout
const logoutUser = async (req, res) => {
    res.clearCookie("refreshToken", { path: "/" });
    res.json({ message: "user logout successfully" })
}

// authenticaeUser
const authenticateUser = async (req, res) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(404).json({ message: "token not found" })

    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "invalid token" })
        req.user = user;
        next()
    })
}


export {registerUser,loginUser,logoutUser,authenticateUser}