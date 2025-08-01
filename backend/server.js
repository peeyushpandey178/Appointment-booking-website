import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

const db=async()=>{
  await connectDB();
  app.listen(port, () => console.log(`Server started on PORT:${port}`))
}
db();

connectCloudinary()

// middlewares
app.use(express.json())
const allowedOrigins = [
  'https://parijaat-website-eta.vercel.app',                // local Vite dev server
  'https://parijaat-admin-eup5.vercel.app'       // production frontend
];

// app.use(cors());


app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true // Required if using cookies/auth headers
}));

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

