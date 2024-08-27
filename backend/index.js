const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
require('dotenv').config();

connectToMongo();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())

app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/notes'));

app.listen(port, () => {
  console.log(`To-do List backend listening!`);
})
