import express from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import cors from "cors"
import mongoose from "mongoose";
import userRouter from "./routes/user-route.js"
import tourRouter from "./routes/tour-route.js"
import multer from "multer";


const app = express();
const upload = multer({
    dest: 'uploads/',
    limits: { fieldSize: 25 * 1024 * 1024 } // 25MB limit
  });

// app.get("/", (req,res) => {
//     res.send("hi")
// });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();

/* Routes */
app.use("/user", userRouter);
app.use("/tours", upload.single('image') , tourRouter);


/* Connecting to database (Mongodb) */
const port = process.env.PORT || 4001;
mongoose.connect(process.env.MONGO_URL)
.then( () => {
    app.listen(port, () => {
       console.log(`server is running on ${port}`);
    })    
})
.catch( (error) => console.log(error));