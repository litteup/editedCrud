const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const shopItemRoute = require('./routes/shopItems');
const authRoute = require('./routes/auth');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());


app.use('/v1/shop',shopItemRoute);
app.use('/v1/auth', authRoute);



const connect = mongoose.connect(process.env.MONGODBURL);

connect.then((req, res) =>{
    console.log("Connected to MongoDB.")
}).catch((error) =>{
    console.log(`Error encountered while connecting to MongoDB.\nError:${error}`);
});



app.listen(port, ()=>{
    console.log(`Server running on port ${port}.`);
});