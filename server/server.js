const express        = require("express");
const mongoose       = require("mongoose");
const dotenv         = require("dotenv");
const cors           = require("cors");

const app = express();

app.use(cors())

// Dev environement
if (process.env.NODE_ENV !== "production") require("dotenv").config();
dotenv.config({ path: "./.env"});

// DB Config
const URI = process.env.MONGO_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false } )
    .then(() => console.log("MongoDB connection is established..."))
    .catch(err => console.log(err));

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/users", require("./routes/auth"));
app.use("/articles", require("./routes/articles"));

// Server connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}...`));