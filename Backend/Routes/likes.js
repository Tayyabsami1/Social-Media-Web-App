import Express from "express"
import { getLikes,addLike } from "../Controllers/like.js";

const router=Express.Router();


router.get("/:post_id",getLikes );
router.post("/",addLike );

export default router;