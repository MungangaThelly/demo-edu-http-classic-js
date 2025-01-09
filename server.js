// server.js 
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');


dotenv.config(); // Ladda miljövariabler från .env 


const app = express();

// Enable CORS for all origins (or specify domains you want to allow)
app.use(cors());


app.use(bodyParser.json()); 


// Databasanslutning
mongoose.connect(process.env.MONGO_CONNECTION_STRING) 
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Database connection error:', err)); 


// API-rutter 
const userRouter = require('./routes/userRoutes'); 
app.use('/api/users', userRouter); 


//Starta servern 
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});