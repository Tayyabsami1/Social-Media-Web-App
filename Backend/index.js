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

const allowedOrigins = ['https://socialsparks.netlify.app'];
// const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Enable credentials
  optionsSuccessStatus: 200,
};

import dotenv from "dotenv"
dotenv.config();

// app.use(cors({origin:true}));

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(Express.json());
app.use(cookieParser());

// Middlewares
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Origin', 'https://socialsparks.netlify.app');
  // res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
);
  //     res.header("Access-Control-Allow-Headers", "*");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../FrontEnd/public/Uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const profilepic_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../FrontEnd/public/Uploads')
  },
  filename: function (req, file, cb) {
    const lastDotIndex = file.originalname.lastIndexOf('.');
    const extension = file.originalname.substring(lastDotIndex + 1);
    cb(null, "ProfilePicture_" + req.params.user_id + "." + extension)
  }
})

const upload = multer({ storage: storage })
const Pic_upload = multer({ storage: profilepic_storage })

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/Suggestions", SuggestionRoutes)
app.use("/api/FriendsR", FriendsRRoutes)
app.use("/api/Friends", FriendsRoutes)

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);

})

app.post("/api/uploadpic/:user_id", Pic_upload.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);

})

app.listen(3000, () => {
  console.log("The server has started");
})