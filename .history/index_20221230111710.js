// A express server, which will handle api requests come in and respond with a json object, it will use body parser as well as cors to handle the requests

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});