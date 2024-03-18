import express from "express";
import { getMyDetail, logOutUser, registerUser, signInUser } from "../controller/User.Controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", signInUser);
router.get("/me", isAuth, getMyDetail);
router.get("/logout", isAuth, logOutUser);


export default router;