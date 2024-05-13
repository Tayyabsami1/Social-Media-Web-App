import jwt from "jsonwebtoken";
import { db } from "../connect.js"
import sql from "mssql";
import moment from "moment"

export const getPosts = async (req, res) => {
    // ! Authrnticate User Logic
    let user_id = parseInt(req.query.user_id);
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(400).json("User not authenticated");
    }

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err)
            return res.status(403).json("Your Token is Invalid ")

        const myreq = db.request();

        user_id ? myreq.input("User_id", sql.Int, user_id) : myreq.input("User_id", sql.Int, userInfo.id);
        const q = user_id ? `select p.*,u.user_id as UserId, u.username,u.profile_picture from Posts as p  join Users as u on u.user_id=p.user_id where p.user_id=@User_id` : `select distinct  p.*,u.user_id as UserId, u.username,u.profile_picture from Posts as p  join Users as u on u.user_id=p.user_id left join Friends f on p.user_id=f.friend_id_1 where f.friend_id_2=@User_id or p.user_id=@User_id order by p.timestamp desc`;

        try {
            const data = await myreq.query(q);
            return res.status(200).json(data.recordset);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
}

export const addPost = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(400).json("User not authenticated");
    }

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err)
            return res.status(403).json("Your Token is Invalid ");

        let q = "insert into Posts(user_id,content,media_url,timestamp) values(@User_id,@Content,@Media_url,@timestamp)";


        const myreq = db.request();

        myreq.input("Content", sql.Text, req.body.Content);
        myreq.input("User_id", sql.Int, userInfo.id);
        myreq.input("Media_url", sql.VarChar(255), req.body.Media_url);
        myreq.input("timestamp", sql.DateTime, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"))

        if (err)
            return res.json(500).json(err);

        const data = await myreq.query(q);
        return res.status(200).json("Post Creation Successful");

    })
}

export const deletePost = async (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(400).json("User not authenticated");
    }

    jwt.verify(token, "secretkey", async (err, userInfo) => {

        if (err)
            return res.status(403).json("Your Token is Invalid ");


        const myreq = db.request();

        myreq.input("p_post_id", sql.Int, req.params.post_id);
        myreq.input("u_user_id", sql.Int, userInfo.id);

        const q = "EXEC DeletePost @post_id =@p_post_id,@user_id=@u_user_id;";

        try {
            const data = await myreq.query(q);
            if (data.rowsAffected > 0)
                return res.status(200).json("Post deleted Successfully");
            else
            return res.status(401).json("You are not authorized to delete this");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    });
}