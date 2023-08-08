const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');



require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 5000;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header( 
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully")
}) 
 


app.use('/exercise', require('./routes/exercise')); 
app.use('/user', require('./routes/users'));

app.listen(port, () =>{
    console.log(`server is runing at port: ${port}`);
}) 