const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const path = require("path");

//middleware
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config({ path: "./config.env" });
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// console.log(process.env.DOMAIN);

// const corsOptions = {
//   origin: "*",
//   credentials: true, // Allow credentials (cookies)
//   optionSuccessStatus: 200,
// };
// console.log(corsOptions);
// app.use(cors(corsOptions));

// Log the configuration

//route Imoprt
// const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const project = require("./routes/projectRoute");
const internship = require("./routes/internshipRoute");
// const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

//route
// app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", internship);
// app.use("/api/v1", order);
// app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });

//middleware to handle errors
app.use(errorMiddleware);

module.exports = app;