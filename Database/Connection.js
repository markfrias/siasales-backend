const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://SIASalesTeam:x9qYUi1mPPOgumeQ@siasalesteam.on5sr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
       
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