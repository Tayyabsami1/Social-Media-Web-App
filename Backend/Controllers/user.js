import { db } from "../connect.js"
import sql from "mssql"

export const getuser = async (req, res) => {
    const myreq = db.request();
    myreq.input("user_id", sql.Int, req.params.user_id);
    let q = "select * from Users where user_id=@user_id";

    try {
        const data = await myreq.query(q);
        if (data.recordset.length) {
            const { password, ...info } = data.recordset[0];
            return res.status(200).json(info);
        }
        return res.status(500).json("This User doesnot exist")


    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }

}

export const updateUser = async (req, res) => {
    const myreq = db.request();

    myreq.input("pic", sql.VarChar(255), req.body.imgUrl.data);
    myreq.input("user_id", sql.Int, req.params.user_id);

    await myreq.query("update users set profile_picture=@pic where user_id=@user_id");

    return res.status(200).json("Picture updated successfully");
}

export const searchuser = async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm.toLowerCase(); // Convert search term to lowercase

        //console.log("Rows: ",searchTerm);

        const request = db.request();
        const result = await request.input('searchTerm', sql.VarChar, searchTerm)
            .query('SELECT username,user_id FROM Users WHERE LOWER(username) LIKE @searchTerm + \'%\'');

        return res.status(200).json(result.recordset);

    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};