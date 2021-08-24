const express = require("express");
const dotenv = require("dotenv");

//LOAD ENV VARS
dotenv.config({ path: "./config/config.env" });

const app = express();
const port = process.env.port || 5000;

app.listen(port,console.log("Server running in "+ process.env.NODE_ENV + " mode on " +  port));
