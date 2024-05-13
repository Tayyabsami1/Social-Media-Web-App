import Express from "express"
import {  getPosts,addPost,deletePost} from "../Controllers/post.js";

const router=Express.Router();


router.get("/", getPosts );
router.post("/",addPost)
router.delete("/:post_id",deletePost);

export default router;