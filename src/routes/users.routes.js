import { registerUser, loginUser, logoutUser, authenticateUser } from "../controllers/users.controllers.js"
import express from "express"

const router = express.Router()

router.get("/registerUser", registerUser)
router.get("/loginUser", loginUser)
router.get("/logoutUser", logoutUser)

export default router