import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import sql from "mssql";

export const signup = async (req, res) => {
    // ? Syntax !!
    // const data = pool.request().query('select * from Card');
    // const data = pool.request().input('parameter', sql.VarChar, req.params.cardNum).query("select * from card where cardNum=@parameter");

    try {

        const q = "select * from Users where username=@Username"

        const myreq = db.request();

        myreq.input("Username", sql.VarChar(50), req.body.Username);
        // myreq.input("Password", sql.VarChar(50), req.body.Password);


        // const data = await myreq.query("insert into Users (Username,Password) values (@Username,@Password);")

        const data =await myreq.query(q);

            if (data.recordsets.length)
                return res.status(409).json("User already exists");

            console.log(data)
            return res.json(data);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }

    // Hash the password 
    // const salt = bcrypt.genSaltSync(10);
    // const hashedpass = bcrypt.hashSync(req.body.password, salt);

}

export const login = (req, res) => {

}

export const logout = (req, res) => {

}