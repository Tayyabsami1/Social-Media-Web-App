//Controller message.js before logigng in user with id =1

import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import sql from "mssql";
import jwt from "jsonwebtoken"



//Function to get friends
export const getFriends = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT u.user_id, u.username, u.profile_picture 
            FROM Users u
            JOIN Friends f ON u.user_id = f.friend_id_1 OR u.user_id = f.friend_id_2
            WHERE (f.friend_id_1 = @userId OR f.friend_id_2 = @userId) AND u.user_id != @userId
        `;
        const result = await db.request()
            .input('userId', sql.Int, userId)
            .query(query);
        res.json(result.recordset);
    } catch (error) {
        console.error('Failed to fetch friends:', error);
        res.status(500).send({ message: 'Error fetching friends', error: error.message });
    }
};







//Function to fetch messags
export const getMessages = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const query = `
            SELECT m.content, m.sent_at, CASE WHEN m.sender_id = @userId THEN 'right' ELSE 'left' END AS alignment
            FROM Messages m
            WHERE (m.sender_id = @userId AND m.receiver_id = @friendId) OR (m.sender_id = @friendId AND m.receiver_id = @userId)
            ORDER BY m.sent_at
        `;
        const result = await db.request()
            .input('userId', sql.Int, userId)
            .input('friendId', sql.Int, friendId)
            .query(query);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).send({ message: 'Error fetching messages', error: err.message });
    }
};







// Function to send a message
// Controller/message.js
export const sendMessage = async (req, res) => {
    
    const { senderId, receiverId, content } = req.body;
    try {
        const query = `
            INSERT INTO Messages (sender_id, receiver_id, content) 
            VALUES (@senderId, @receiverId, @content)
        `;
        await db.request()
            .input('senderId', sql.Int, senderId)
            .input('receiverId', sql.Int, receiverId) // Make sure this matches your DB and parameter names
            .input('content', sql.NVarChar(sql.MAX), content)
            .query(query);
        res.status(201).send({ message: 'Message sent successfully' });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).send({ message: 'Error sending message', error: err.message });
    }
};
