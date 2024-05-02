import Express from "express"
import {  getComments,addComment} from "../Controllers/comment.js";

const router=Express.Router();


router.get("/:postId",getComments );
router.post("/",addComment);

export default router;