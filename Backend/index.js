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
import SuggestionRoutes from "./Routes/Suggestions.js"
import FriendsRRoutes from "./Routes/FriendsR.js"
import FriendsRoutes from "./Routes/Friends.js"


const app = Express();


// Middlewares
app.use((req,res,next)=>{
  // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

import dotenv from "dotenv"
dotenv.config();

app.use(cors());

app.use(Express.json());
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../FrontEnd/public/Uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now()+file.originalname)
    }
  })

const profilepic_storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../FrontEnd/public/Uploads')
    },
    filename: function (req, file, cb) {
      const lastDotIndex = file.originalname.lastIndexOf('.');
      const extension = file.originalname.substring(lastDotIndex + 1);
      cb(null,  "ProfilePicture_"+req.params.user_id+"."+extension)
    }
  })
  
  const upload = multer({ storage: storage })
  const Pic_upload = multer({ storage: profilepic_storage })

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/likes",likeRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/Suggestions",SuggestionRoutes)
app.use("/api/FriendsR",FriendsRRoutes)
app.use("/api/Friends",FriendsRoutes)

app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file=req.file;
    return res.status(200).json(file.filename);

})

app.post("/api/uploadpic/:user_id",Pic_upload.single("file"),(req,res)=>{
    const file=req.file;
    return res.status(200).json(file.filename);

})

app.listen(3000, () => {
    console.log("The server has started");
})