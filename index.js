


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
