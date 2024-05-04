// Backend/routes/message.js
import express from 'express';
import { getFriends, getMessages, sendMessage } from '../Controllers/message.js';

const router = express.Router();

// Get all friends for a user
// router.get('/friends', getFriends);
router.get('/friends/:userId', getFriends);

// Get messages between the current user and a friend
// router.get('/friends/:userId/:friendId', getMessages);
router.get('/:userId/:friendId', getMessages);

// Send a new message
// This should be a POST request just to '/send' if senderId and receiverId are in the body.
router.post('/send', sendMessage);


export default router;
