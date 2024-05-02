import { db } from "../connect.js";
import sql from "mssql"

export const getComments = async (req, res) => {
    const myreq = db.request();
    myreq.input("postId", sql.Int, req.params.postId)
    let q = "select c.*,u.user_id as UserId, u.username,u.profile_picture from Comments as c  join Users as u on c.user_id=u.user_id where c.post_Id=@postId order by c.timestamp desc";

    try {
        const data = await myreq.query(q);
        return res.status(200).json(data.recordset);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

export const addComment = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(400).json("User not authenticated");
    }

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err)
            return res.status(403).json("Your Token is Invalid ");

        let q = "insert into Comments(user_id,post_id,content,timestamp) values(@User_id,@post_id,@Content,@timestamp)";


        const myreq = db.request();

        myreq.input("Content", sql.Text, req.body.Content);
        myreq.input("User_id", sql.Int, userInfo.id);
        myreq.input("post_id", sql.VarChar(255), req.body.post_id);
        myreq.input("timestamp", sql.DateTime, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"))

        if (err)
            return res.json(500).json(err);

        const data = await myreq.query(q);
        return res.status(200).json("Post Creation Successful");

    })

}