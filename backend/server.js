const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const notices = require("./routes/api/notices");
const cors = require('cors');
const app = express();


// Bodyparser middleware
app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect(
    "mongodb://localhost:127.0.0.1/notices",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB!");
    }
  )
  .catch(err => console.log(err));

// API Routes
app.use("/api/notices", notices);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Connected to Port ${PORT}`);
  console.log(`@api-route : http://localhost:${PORT}/api/notices`);
});
