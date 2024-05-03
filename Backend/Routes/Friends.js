import Express from "express"
import {FriendsList} from "../Controllers/Friends.js";

const router=Express.Router();


router.get("/friends/:userId",FriendsList);


export default router;