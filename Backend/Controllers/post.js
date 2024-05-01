import jwt from "jsonwebtoken";
import { db } from "../connect.js"
import sql from "mssql";

export const getPosts = async (req, res) => {

    // ! Authrnticate User Logic
    // getting the token from our cookies 
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(400).json("User not authenticated");

    }
    //verifying the token , in user info we get the UserID
    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err)
            return res.status(403).json("Your Token is Invalid ")

        const myreq = db.request();

        myreq.input("User_id", sql.Int, userInfo.id)
        let q = "select p.*,u.user_id as UserId, u.username,u.profile_picture from Posts as p  join Users as u on u.user_id=p.user_id left join Friends f on p.user_id=f.friend_id_1 where f.friend_id_2=@User_id or p.user_id=@User_id order by p.timestamp desc";

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
    
        let q="insert into Posts(user_id,content,media_url) values(@User_id,@Content,'')";

        
        const myreq = db.request();

        myreq.input("Content",sql.Text,req.body.Content);
        myreq.input("User_id",sql.Int,userInfo.id);
        // myreq.input("Media_url",sql.VarChar(255), req.body.Media_url);

        if(err)
        return res.json(500).json(err);

        const data = await myreq.query(q);
        return res.status(200).json("Post Creation Successful");

    })



}