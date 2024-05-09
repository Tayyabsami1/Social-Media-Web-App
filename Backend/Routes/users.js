import Express from "express"
import { getuser,updateUser } from "../Controllers/user.js";

const router=Express.Router();


router.get("/find/:user_id", getuser);
router.post("/:user_id", updateUser);
export default router;