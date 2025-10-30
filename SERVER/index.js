const express = require("express");
const app = express();

//import routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const contactRoutes = require("./routes/Contact");

const dotenv = require("dotenv");
const cors = require("cors");
const {cloundinaryConnect} = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const database = require("./config/database")
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares - THESE MUST COME BEFORE ROUTES
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

//cloudinary connection
cloundinaryConnect();

//routes - MOUNT THE ROUTES
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running....",
    })
})

// Debug: Print registered routes
console.log("Registered routes:");
app._router.stack.forEach((r) => {
  if (r.route) {
    console.log(`${Object.keys(r.route.methods)} ${r.route.path}`)
  } else if (r.name === 'router') {
    r.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(`${Object.keys(handler.route.methods)} ${handler.route.path}`)
      }
    })
  }
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})