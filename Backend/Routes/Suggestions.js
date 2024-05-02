import Express from "express"
import {FriendsOfFriends,profiles,otherusers,SendRequest } from "../Controllers/Suggestions.js";

const router=Express.Router();


router.get("/friends-of-friends/:userId",FriendsOfFriends);
router.get("/profiles/:userIds",profiles);
router.get("/other-users/:userId",otherusers);
router.post("/send-friend-request/:profileId/:loggedInUserId",SendRequest);

export default router;