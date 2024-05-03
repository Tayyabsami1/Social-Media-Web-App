import Express from "express"
import { getLikes,addLike,deleteLike } from "../Controllers/like.js";

const router=Express.Router();


router.get("/",getLikes );
router.post("/",addLike );
router.delete("/:post_id",deleteLike);

export default router;