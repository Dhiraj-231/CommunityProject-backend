import express from "express";
import {
    communityCreate,
    getAllCommunityDetail,
    getAllMember,
    getMyJoinedCommunity,
    getMyOwnedCommunity

} from "../controller/Community.Controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, communityCreate);
router.get("/allDetail", getAllCommunityDetail);
router.get("/:id/members", getAllMember);
router.get("/me/owner", isAuth, getMyOwnedCommunity);
router.get("/me/member", isAuth, getMyJoinedCommunity);


export default router;