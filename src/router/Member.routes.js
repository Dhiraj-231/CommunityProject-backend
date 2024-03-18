import express from "express";
import { AddMember, removeMember } from "../controller/Member.Controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/add", isAuth, AddMember);
router.delete("/delete/:id", isAuth, removeMember);


export default router;