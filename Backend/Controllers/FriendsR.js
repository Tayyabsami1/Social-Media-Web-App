import { db } from "../connect.js"
import sql from "mssql";

// Fetch friend requests for the logged-in user
export const FriendRequests = async (req, res) => {
    const userId = req.params.userId;
    try {
        const request = db.request();
        const result = await request.input('userId', sql.Int, userId)
            .query(`SELECT distinct u.user_id, u.username, u.profile_picture
            FROM Requests r
            INNER JOIN Users u ON r.requester_id = u.user_id
            WHERE r.user_id =@userId
            Order by u.username`);
        return res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Accept friend request
export const AcceptRequests = async (req, res) => {
    const requestId = req.params.requestId;
    //console.log(requestId)
    try {
        const request = db.request();
        await request.input('requestId', sql.Int, requestId)
            .query(`INSERT INTO Friends (friend_id_1, friend_id_2)
            SELECT distinct user_id, requester_id
            FROM Requests
            WHERE requester_id = @requestId;
                    
                    DELETE FROM Requests WHERE requester_id = @requestId;`);
        return res.json({ message: 'Friend request accepted successfully' });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Decline friend request
export const DeclineRequests = async (req, res) => {
    const requestId = req.params.requestId;
    try {
        const request = db.request();
        await request.input('requestId', sql.Int, requestId)
            .query(`DELETE FROM Requests WHERE requester_id = @requestId`);
        return res.json({ message: 'Friend request declined successfully' });
    } catch (error) {
        console.error('Error declining friend request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
