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
            WHERE r.user_id =@userId`);
        return res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Accept friend request
export const AcceptRequests = async (req, res) => {

    const requestId = req.params.requestId;
    const userId = req.params.userId;
    //console.log(requestId)
    try {
        const request = db.request();
        const q = "select * from Friends where friend_id_1=@userId and  friend_id_2=@requestId or friend_id_1=@requestId and  friend_id_2=@userId";
        request.input('requestId', sql.Int, requestId)
            .input('userId', sql.Int, userId);

        let data = await request.query(q);
        if (data.recordset.length>=1){
            return res.status(500).json("This User is already your friend");
        }

        data = await request.query(`INSERT INTO Friends (friend_id_1, friend_id_2)
            VALUES (@userId,@requestId),(@requestId,@userId);
                    
                    DELETE FROM Requests WHERE requester_id = @requestId AND user_id=@userId;`);

        return res.json({ message: 'Friend request accepted successfully' });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        return res.status(500).json({ error: 'This User is already your friend' });
    }
};

export const DeleteFriend = async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.params.userId;
    const myreq = db.request();

    try {
        await myreq.input('requestId', sql.Int, requestId)
            .input('userId', sql.Int, userId)
            .query(`DELETE FROM Friends WHERE friend_id_1 = @requestId AND friend_id_2=@userId;
            DELETE FROM Friends WHERE friend_id_1 = @userId AND friend_id_2=@requestId`)
        return res.json({ message: 'Friend Removed Successful' });
    } catch (error) {
        console.error('Error removing friend :', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
// Decline friend request
export const DeclineRequests = async (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.params.userId;
    try {
        const request = db.request();
        await request.input('requestId', sql.Int, requestId)
            .input('userId', sql.Int, userId)
            .query(`DELETE FROM Requests WHERE requester_id = @requestId AND user_id=@userId;`);
        return res.json({ message: 'Friend request declined successfully' });
    } catch (error) {
        console.error('Error declining friend request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
