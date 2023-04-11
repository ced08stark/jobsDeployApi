const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const locationRouter = require("./routes/location");
const compagnyRouter = require("./routes/compagny");
const projetRouter = require("./routes/projet");
const consultantRouter = require("./routes/consultant");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/users", locationRouter);
app.use("/users", compagnyRouter);
app.use("/users", projetRouter);
app.use("/users/consultant", consultantRouter);
app.use(bodyParser.json());
app.use('/uploads/documents', express.static('./uploads/documents'));
app.use('/uploads/images', express.static('./uploads/images'));


app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader('Access-Controll-Allow-Headers', 'Origin,X-requested-with,Content,Accept,Content-type')
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Controll-Allow-Origin', '*')
    next()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   // next(createError(404));
});


//app.listen(5000, ()=>console.log("server run"))

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'test' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
