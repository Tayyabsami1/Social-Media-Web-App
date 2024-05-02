import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import sql from "mssql";
import Express from "express"


// Route to fetch friends of friends
export const FriendsOfFriends = async (req, res) => {
    const userId = req.params.userId;
    try {
        // const pool = await sql.connect(config);
        const request = db.request();
        const data = await request.input('userId', sql.Int, userId)
            .query(`SELECT DISTINCT friend_id_2 
                   FROM Friends 
                   WHERE friend_id_1 IN (
                       SELECT friend_id_2 
                       FROM Friends 
                       WHERE friend_id_1 = @userId
                       UNION
                       SELECT friend_id_1 
                       FROM Friends 
                       WHERE friend_id_2 = @userId
                   )
                   AND friend_id_2 != @userId 
                   UNION
                   SELECT DISTINCT friend_id_1 
                   FROM Friends 
                   WHERE friend_id_2 IN (
                       SELECT friend_id_2 
                       FROM Friends 
                       WHERE friend_id_1 = @userId
                       UNION
                       SELECT friend_id_1 
                       FROM Friends 
                       WHERE friend_id_2 = @userId
                   )
                   AND friend_id_1 != @userId` 
                    
                );
        //console.log(data.recordset);
        const friendsOfFriends = data.recordset.map(row => row.friend_id_2);
        //console.log(friendsOfFriends);
        return res.json(friendsOfFriends);
    } catch (error) {
        console.error('Error fetching friends of friends:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Route to fetch profiles of users
export const profiles = async (req, res) => {
    const userIds = req.params.userIds.split(',');
    try {
        //const pool = await sql.connect(config);
        const request = db.request();
        const query = `SELECT user_id, username, profile_picture
                        FROM Users 
                        WHERE user_id IN (${userIds.map(id => '@id' + id).join(',')})`;


        // Add parameters to the request
        userIds.forEach((id, index) => {
            request.input('id' + id, sql.Int, id);
        });

        // Execute the query
        const result = await request.query(query);
        //console.log(result.recordset)
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Route to fetch other users except the logged-in user
export const otherusers = async (req, res) => {
    const userId = req.params.userId;
    try {
        //const pool = await sql.connect(config);
        const request = db.request();
        const result = await request.input('userId', sql.Int, userId)
            .query(`SELECT user_id, username, profile_picture
                    FROM Users 
                    WHERE user_id != @userId
                    AND user_id NOT IN(
                        SELECT friend_id_1
                        FROM Friends
                        WHERE friend_id_2=@userId
                    )
                    AND user_id NOT IN(
                        SELECT friend_id_2
                        FROM Friends
                        WHERE friend_id_1=@userId
                    )
                    `);
        return res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching other users:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Sample route to handle sending friend requests
export const SendRequest = async (req, res) => {
    const profileId = req.params.profileId;
    // Implement logic to send friend request
    // Example: Insert request information into Requests table
   
    try {
        const request = db.request();
        //const pool = await sql.connect(config);
        await request.input('profileId', sql.Int, profileId)
            .input('loggedInUserId', sql.Int, 1) // Assuming loggedInUserId is available in request body
            .query(`INSERT INTO Requests (user_id, requester_id)
                    VALUES (@profileId, @loggedInUserId)`);
        return res.json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error('Error sending friend request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

