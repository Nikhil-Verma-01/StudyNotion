const express = require("express");
const app = express();

//import routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const contactRoutes = require("./routes/Contact.js");

const dotenv = require("dotenv");
const cors = require("cors");
const {cloundinaryConnect} = require("./config/cloudinary.js");
const cookieParser = require("cookie-parser");
const database = require("./config/database.js")
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
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

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes)

//def route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "",
    })
})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})


