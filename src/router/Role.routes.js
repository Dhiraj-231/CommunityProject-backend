import express from "express";
import { getAllDetail, roleCreation } from "../controller/Role.Controller.js";

const router = express.Router();

router.post("/create", roleCreation);
router.get("/getAll", getAllDetail);


export default router;