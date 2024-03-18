import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Rolerouter from "./src/router/Role.routes.js";
import Userrouter from "./src/router/User.routes.js";
import Communityrouter from "./src/router/Community.routes.js";
import MemberRouter from './src/router/Member.routes.js';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "50Mb" }));
app.use(express.urlencoded({ extended: true, limit: '50Mb' }));
app.use(cookieParser());
app.use("/api/v1/role", Rolerouter);
app.use("/api/v1/auth", Userrouter);
app.use("/api/v1/community", Communityrouter);
app.use("/api/v1/member", MemberRouter);



export default app;