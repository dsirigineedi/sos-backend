const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const GlobalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const helmet = require('helmet')
const app = express();
const cors = require('cors');

app.use(helmet())
app.use(express.json());
app.use(cors());
app.options("*",cors());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.get('/',(req,res)=>{ res.send("Hello soulful")});
app.use('/api/v1/users', userRouter);

//DEBUG
app.all('*',(req,res,next)=>{
    // Actual Error Handling
    next(new AppError(`cannot find ${req.originalUrl} on this server!!!`,404));
});

//DEBUG Global Error Middleware
app.use(GlobalErrorHandler);

module.exports = app;