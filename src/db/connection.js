const mongoose = require('mongoose');
const mongoString = 'mongodb+srv://rajupushpad:uL25wE8vwwarqc1N@cluster0.foh7fjc.mongodb.net/test'; //process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});