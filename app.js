const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const accountRouter = require('./routes/accountRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const partyRouter = require('./routes/partyRouter')
const categoryRouter = require('./routes/categoryRouter')
const serviceRouter = require('./routes/serviceRouter')
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
//const order = require('./routes/order')
const orderRouter = require('./routes/orderRouter')
const app = express();

app.use(cors()); // Access-Control-Allow-Origin *
app.options('*', cors());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));
//app.set('view engine', 'jade');

app.use('/test', (req, res, next) => {
  res.json({
    test: 'success'
  })
})

// 3) ROUTES
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/parties', partyRouter);
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/orders', orderRouter)
//app.use('/order', order)
app.use('/api/v1/upload', uploadRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
