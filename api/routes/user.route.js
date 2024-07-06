import { Router } from "express"; 
import { deleteUser, getUser, getUsers, updateUser, savePost, profilePosts, getNotificationNumber} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = Router();

router.get("/",getUsers)

// router.get("/:id", verifyToken, getUser)

router.put("/:id", verifyToken, updateUser)

router.delete("/:id",verifyToken, deleteUser)

router.post("/save",verifyToken, savePost)

router.get("/profilePosts", verifyToken, profilePosts)

router.get("/notification", verifyToken, getNotificationNumber)

export default router;