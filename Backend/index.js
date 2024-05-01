import Express from "express";
import cors from "cors";

import userRoutes from "./Routes/users.js"
import authRoutes from "./Routes/auth.js"
import postRoutes from "./Routes/posts.js"
import likeRoutes from "./Routes/likes.js"
import commentRoutes from "./Routes/comments.js"
import messageRoutes from "./Routes/messages.js"
import cookieParser from "cookie-parser";
import multer from "multer";

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../FrontEnd/public/Uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/messages",messageRoutes);

app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    return res.status(200).json(file.filename);

})

app.listen(3000, () => {
    console.log("The server has started");
})