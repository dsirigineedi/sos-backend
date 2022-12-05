const dotnv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotnv.config({ path: './.env' });

//Debug
process.on('uncaughtException',err => {
    console.log(err.name , err.message);
    console.log('Uncaught Exception occured. Shutting Down!!');
    process.exit(1);
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD) ||'mongodb://mongo:27017';

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
mongoose.Promise = global.Promise;

//Debug
process.on('unhandledRejection',err => {
    console.log(err.name , err.message);
    console.log('Unhandled Exception occured. Check your connection status and Auth Password Correctly. Authetication Failed!!');
    server.close(() => {
        process.exit(1);
    });
});
