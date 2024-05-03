import { db } from "../connect.js";
import sql from "mssql"
import jwt from "jsonwebtoken";

export const getLikes = async (req, res) => {

    const myreq = db.request();

    myreq.input("post_id",sql.Int,req.query.post_id)
    let q = "select user_id from Likes where post_id=@post_id";

    try {
        const data = await myreq.query(q);
        return res.status(200).json(data.recordset);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(400).json("User not authenticated");
    }

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err)
            return res.status(403).json("Your Token is Invalid ");

        let q = "insert into Likes(user_id,post_id) values(@User_id,@post_id)";


        const myreq = db.request();

        myreq.input("User_id", sql.Int, userInfo.id);
        myreq.input("post_id", sql.Int, req.body.post_id);

        if (err)
            return res.json(500).json(err);

        const data = await myreq.query(q);
        return res.status(200).json("Post Liked Successful");

    })
}

export const deleteLike=(req,res)=>{
    
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(400).json("User not authenticated");
    }

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if (err)
            return res.status(403).json("Your Token is Invalid ");

        let q = "delete from  Likes where user_id=@User_id and post_id=@post_id";


        const myreq = db.request();
        myreq.input("User_id", sql.Int, userInfo.id);
        myreq.input("post_id", sql.Int, req.params.post_id);

        if (err)
            return res.json(500).json(err);

        const data = await myreq.query(q);
        return res.status(200).json("Comment Added Successful");

    })
}