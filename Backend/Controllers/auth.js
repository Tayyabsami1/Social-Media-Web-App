import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import sql from "mssql";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const signup = async (req, res) => {

    try {
        const myreq = db.request();

        myreq.input("Username", sql.VarChar(50), req.body.Username);

        // Checking if the User already exist or not 
        let q = "select * from Users where username=@Username";

        let data = await myreq.query(q);

        if (data.recordset.length)
            return res.status(409).json("User already exists");

        myreq.input("Email", sql.VarChar(255), req.body.Email);
        q = "select * from Users where email=@Email";

        data = await myreq.query(q);

        if (data.recordset.length)
            return res.status(409).json("An account already exists with the same Email");

        // Hashing the Password 
        const salt = bcrypt.genSaltSync(10);
        const hashedpass = bcrypt.hashSync(req.body.Password, salt);

        myreq.input("Password", sql.VarChar(255), hashedpass);
        myreq.input("Birthdate", sql.Date, req.body.Birthdate);

        q = "insert into Users (username,email,password,birthdate) values (@Username,@Email,@Password,@Birthdate)"

        try {

           await  myreq.query(q);
        }
        catch (err) {
            return res.status(409).json(err.precedingErrors[0].message);
        }

        return res.status(200).json("User creation successful");
    }

    catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

export const login = async (req, res) => {

    const myreq = db.request();

    myreq.input("Username", sql.VarChar(50), req.body.Username);
    myreq.input("Password", sql.VarChar(255), req.body.Password);

    let q = "select * from Users where username=@Username";

    try {
        const data = await myreq.query(q);

        if (!data.recordset.length)
            return res.status(409).json("User doesnot exist");

        const checkPass = bcrypt.compareSync(req.body.Password, data.recordset[0].password);

        if (!checkPass)
            return res.status(400).json("Wrong Username or Password");
        
        // creating an Authentication token on the basis of User Id will be further used to authenticate user to 
        // create and view posts 
        const token = jwt.sign({ id: data.recordset[0].user_id }, process.env.REACT_APP_SecretKey);

        // Destructuring data from User table
        const { password, ...others } = data.recordset[0];
        //saving a cookie named access toeken containing my secure token and user data without password
        return res.cookie("accessToken", token, { httpOnly: true }).status(200).json(others)
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

export const logout = (req, res) => {
    res.clearCookie("accesstoken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User Logged out")
}