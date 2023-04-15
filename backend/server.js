require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ImageRoutes = require("./routes/image.route");
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use("/api", ImageRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on http://127.0.0.1:5000");
    });
  })
  .catch((err) => console.log(err));
