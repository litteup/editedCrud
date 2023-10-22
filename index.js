const express = require('express');
const app = express();
const authRoute = require("./routes/auth");
const mongoose = require('mongoose');
require("dotenv").config();
const port = 3000 || process.env.PORT;
const shopRoute = require("./routes/shopItems");




const connect = mongoose.connect(process.env.MONGODBURL);

connect.then((req,res) =>{
    console.log("Connected to database.");
}).catch((error) =>{
    console.log("Error connecting to database.\nError:", error);
});


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use("/v1/auth", authRoute);
app.use("/v1/shop", shopRoute);

app.listen(port, ()=> {
    console.log(`Server running on port: ${port}`);
});