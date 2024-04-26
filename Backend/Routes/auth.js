import Express from "express"
import {  login,signup,logout} from "../Controllers/auth.js";

const router=Express.Router();


router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",logout);

export default router;