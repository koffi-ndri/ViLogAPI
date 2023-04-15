 const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const Sequelize = require('sequelize');
const { development } = require('./config/config');
const { database, password, username, host, dialect } = development;
const adminRoute = require('./routes/admin');
const hostRoute = require('./routes/host');
const visitorRoute = require('./routes/visitor');
const { verifyToken } = require('./middlewares/permissions');
const { apiErrorHandler } = require('./middlewares/apiErrorHandler');

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});


//connect to database
sequelize.authenticate()
  .then(() => {
    console.log("Connected successfully to " + database + " database")
  })
  .catch(error => {
    console.error("Not able to connect to " + database + " database", error);
  });

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/v2/admin", verifyToken, adminRoute);
app.use("/api/v2/host", hostRoute);
app.use("/api/v2/visitor", visitorRoute);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(apiErrorHandler) //{
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
//});

module.exports = app;
