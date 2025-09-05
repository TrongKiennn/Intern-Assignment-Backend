const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();


const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

const loginRouter = require("./src/login/loginRouter");
const registrationRouter=require("./src/registration/registrationRouter")
const dashboardRouter=require("./src/dashboard/dashboardRouter")

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));


app.use("/auth", loginRouter);
app.use("/auth", registrationRouter);
app.use("/",dashboardRouter)


const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

