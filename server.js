const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>');
// });

//mongoose connection

connectDB();

app.listen(PORT, () => {
  console.log('Server is running');
});

app.use('/api/users', require('./api/users'));
