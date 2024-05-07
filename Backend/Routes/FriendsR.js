import Express from "express"
import {FriendRequests,AcceptRequests,DeclineRequests,DeleteFriend} from "../Controllers/FriendsR.js";

const router=Express.Router();


router.get("/friend-requests/:userId",FriendRequests);
router.post("/accept-friend-request/:requestId/:userId",AcceptRequests);
router.delete("/decline-friend-request/:requestId/:userId",DeclineRequests);
router.delete("/:requestId/:userId",DeleteFriend);


export default router;