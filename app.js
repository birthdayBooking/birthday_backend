const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const messageRoutes = require('./routes/messageRoutes');
const accountRouter = require('./routes/accountRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST']
  }
});

const userSocketMap = {}; // {userId: socketId}

const getReceiverSocketId = receiverId => {
  return userSocketMap[receiverId];
};

io.on('connection', socket => {
  console.log('a user connected', socket.id);

  const { userId } = socket.handshake.query;
  if (userId !== 'undefined') userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('sendMessage', message => {
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit('newMessage', message.newMessage);
      io.to(receiverSocketId).emit('getNotification', {
        conversationId: message.conversationId,
        senderId: message.newMessage.senderId,
        receiverId: message.receiverId,
        isRead: false,
        date: new Date(),
        message: message.newMessage.message
      });
    }
  });

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

server.listen(8080);

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/accounts', accountRouter);
app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
module.exports.io = io;

// module.exports.getReceiverSocketId = getReceiverSocketId;
