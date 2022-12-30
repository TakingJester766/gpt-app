// A express server, which will handle api requests come in and respond with a json object, it will use body parser as well as cors to handle the requests

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-Tp1wF8jaCJ2iV7r5alT4EQBX",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

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

// 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