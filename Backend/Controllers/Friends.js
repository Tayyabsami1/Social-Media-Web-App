import { db } from "../connect.js"
import sql from "mssql";

// Fetch list of friends for the logged-in user
export const FriendsList =  async (req, res) => {
    const userId = req.params.userId;
    try {
        const request = db.request();
        const result = await request.input('userId', sql.Int, userId)
            .query(`SELECT u.user_id, u.username, u.profile_picture
                    FROM Friends f
                    INNER JOIN Users u ON f.friend_id_2 = u.user_id
                    WHERE f.friend_id_1 = @userId
                    UNION
                    SELECT u.user_id, u.username, u.profile_picture
                    FROM Friends f
                    INNER JOIN Users u ON f.friend_id_1 = u.user_id
                    WHERE f.friend_id_2 = @userId
                    Order by u.username`);
        return res.json(result.recordset);

    } catch (error) {
        console.error('Error fetching friends:', error);
       return res.status(500).json('Internal server error' );
    }
};

