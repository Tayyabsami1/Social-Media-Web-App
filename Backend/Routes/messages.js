// Backend/routes/message.js
import express from 'express';
import { getFriends, getMessages, sendMessage } from '../Controllers/message.js';

const router = express.Router();

router.get('/friends/:userId', getFriends);

router.get('/:userId/:friendId', getMessages);

router.post('/send', sendMessage);


export default router;
