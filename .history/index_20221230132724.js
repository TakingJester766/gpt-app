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
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:  
        `Please be brief in your response. You have 250 tokens to use. Simply return quote, have a text break, then exhaustively go through
        ${message}`,
        max_tokens: 250,
        temperature: 0,
    });
    console.log(response.data);
    if (response.data.choices[0].text) {
        res.json({
            message: response.data.choices[0].text
        });
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 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