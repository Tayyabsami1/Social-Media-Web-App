import Express from "express"
import { getuser,updateUser,searchuser } from "../Controllers/user.js";

const router=Express.Router();


router.get("/find/:user_id", getuser);
router.post("/:user_id", updateUser);
router.get("/find/:searchTerm", searchuser);
export default router;

 
