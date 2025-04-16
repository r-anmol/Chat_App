import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getUsersForSidebar , getMessages , sendMessage } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/messages/:id", protectRoute, getMessages);
router.post("/messages/send/:id", protectRoute, sendMessage);
router.get("/users", protectRoute, getUsersForSidebar);


export default router;