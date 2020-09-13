require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./users/user.router');
const app = express();
app.use(express.json());


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users',userRoute);

app.listen(process.env.APP_PORT,()=>{
    console.log("Server up and running in port: ",process.env.APP_PORT)
});