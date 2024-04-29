import Express from "express";
import cors from "cors";

import userRoutes from "./Routes/users.js"
import authRoutes from "./Routes/auth.js"
import postRoutes from "./Routes/posts.js"
import likeRoutes from "./Routes/likes.js"
import commentRoutes from "./Routes/comments.js"
import messageRoutes from "./Routes/messages.js"
import cookieParser from "cookie-parser";

const app = Express();

// Middlewares
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})

app.use(cors({
    origin:"http://localhost:5173",
}));

app.use(Express.json());
app.use(cookieParser());

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

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/messages",messageRoutes);

app.listen(3000, () => {
    console.log("The server has started");
})