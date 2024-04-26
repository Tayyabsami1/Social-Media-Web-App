import Express from "express"
import { getuser } from "../Controllers/user.js";

const router=Express.Router();


router.get("/find/:userID", getuser);

export default router;