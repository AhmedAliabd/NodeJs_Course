const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require('./middleware/error');
const morgan = require('morgan');
const colors = require('colors')
const logger = require('./middleware/logger');
const MongoDB = require('./config/db'); 


//LOAD ENV VARS
dotenv.config({ path: "./config/config.env" });

//connect to DB 
// this need to be called after the {{{----dotenv.config({ path: "./config/config.env" });===}}}
MongoDB();

// Route files
const bootcamps = require("./routes/bootcamps");
//const connectDB = require("./config/db");


const app = express();

app.use(express.json());// when you get req.body you need body-parser now it is included with express you just need to use it

if(process.env.NODE_ENV === 'development')
{
  app.use(morgan('dev'));
}
//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);
const port = process.env.port || 5000;


const server = app.listen(
  port,
  console.log(`Server running in "  ${process.env.NODE_ENV} mode on  ${port}`.bgGreen)
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => 
{
  console.log(`Error: ${err.message}`.bgBrightRed);
  //Close server & exit process
  server.close(()=> process.exit(1));
});