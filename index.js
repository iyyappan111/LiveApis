// const express = require('express');
// const app = express();
// const connectDB = require('./src/Configs/db');
// const router = require('./src/routes');
// const cors = require('cors');
// const port = process.env.PORT || 9000;

// const http = require('http');
// const server = http.createServer(app);
// // const socketIo = require('socket.io');

// app.use(express.json());
// app.use(cors());

// // const io = socketIo(server);
// connectDB()
//   .then(() => {
//     console.log('MongoDB connection established');

//     app.use('/auth', router);

//     server.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });

//     // const connectedUsers = {};

//     // io.on('connection', (socket) => {
//     //   console.log('A user connected: ', socket.id);

//     //   // Store the connected user's socket ID
//     //   connectedUsers[socket.id] = {
//     //     username: '', // You can add a username property
//     //   };

//     //   // Listen for events
//     //   socket.on('setUsername', (username) => {
//     //     connectedUsers[socket.id].username = username;
//     //     console.log(connectedUsers)
//     //     io.emit('userList', Object.values(connectedUsers).map((user) => user.username));
//     //   });

//     //   socket.on('chatMessage', (data) => {
//     //     io.emit('chatMessage', data); // Broadcast the message to all connected clients
//     //   });

//     //   socket.on('disconnect', () => {
//     //     console.log('A user disconnected: ', socket.id);
//     //     delete connectedUsers[socket.id];
//     //     io.emit('userList', Object.values(connectedUsers).map((user) => user.username));
//     //   });
//     // });

//     server.listen(9000, () => {
//       console.log('Server is running on http://localhost:9000');
//     });
//   })
//   .catch((err) => {
//     console.error(`Failed to connect to MongoDB: ${err.message}`);
//   });



const express = require('express');
const app = express();
const connectDB = require('./src/Configs/db');
const router = require('./src/routes');
const cors = require('cors');
const port = process.env.PORT || 9000;

const http = require('http');
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
connectDB()
  .then(() => {
    console.log('MongoDB connection established');
    app.use('/auth', router);
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
  });
