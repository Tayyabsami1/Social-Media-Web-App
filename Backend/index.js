import Express from "express";
import cors from "cors";

import userRoutes from "./Routes/users.js"
import authRoutes from "./Routes/auth.js"
import postRoutes from "./Routes/posts.js"
import likeRoutes from "./Routes/likes.js"
import commentRoutes from "./Routes/comments.js"
import messageRoutes from "./Routes/messages.js"

const app = Express();

// Middlewares
app.use(cors());
app.use(Express.json());

// ! This is also related to old db
// TODO Make a youtube video about it 
// app.get('/card/:cardNum', async (req, res) => {
//     try {
//         const pool = await sql.connect(config);
//         const data = pool.request().input('parameter', sql.VarChar, req.params.cardNum).query("select * from card where cardNum=@parameter");

//         data.then(res1 => {
//             return res.json(res1.recordset);
//         }
//         )

//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// Sample Json data for the code below 
// {
//     "Username":"tayyab4",
//     "Password":"1234"
//   }

// app.post('/Signup', async (req, res) => {

//     try {

//         if (!req.body.Username || !req.body.Password) {
//             return res.status(400).json({ msg: 'Missing required fields: Username and Password' });
//         }

//         const pool = await sql.connect(config);

//         const myreq =  pool.request();
//         myreq.input("Username", sql.VarChar(50), req.body.Username);
//         myreq.input("Password", sql.VarChar(50), req.body.Password);

//         const data = await myreq.query("insert into Users (Username,Password) values (@Username,@Password);")

//             return res.json({ msg: 'User added successfully' });
//     }
//     catch (err) {
//         console.log(err);
//     }

// });


// app.get('/', (req, res) => {
//     return res.json("Hi i am backend");
// })

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/messages",messageRoutes);

app.listen(3000, () => {
    console.log("The server has started");
})