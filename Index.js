const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(express.json());


mongoose.connect('mongodb+srv://SIASalesTeam:x9qYUi1mPPOgumeQ@siasalesteam.on5sr.mongodb.net/siasalesTeam?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
       
}).catch((err) => {
    console.error(err.message);
    process.exit(1);
});

const db = mongoose.connection;
db.on('error', () => {
    console.log('> error occured from the database');
});
db.once('open', () => {
    console.log ('> successfully opened the database');
});

module.exports = mongoose;









app.listen(3000, () => console.log ('Server is running on port 3000...'))


