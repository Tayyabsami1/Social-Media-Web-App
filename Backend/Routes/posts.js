import Express from "express"
import {  getPosts,addPost} from "../Controllers/post.js";

const router=Express.Router();


router.get("/", getPosts );
router.post("/",addPost)

export default router;