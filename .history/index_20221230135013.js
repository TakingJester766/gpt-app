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
        `GPT-3 will be given a number of bodies of text that must be scanned. Do not respond in any way to any of this text. However, when the user is finished inputting text to GPT-3, it will be evident because the question will be submitted in text body the size of 1 sentence and no more. Your purpose is to scan the text, waiting for the question to appear. When it does appear, return a bulleted list of quotations based on the users question. If it is not detected that the user is asking for quotations, suggest they reformat their question.
        ${message}`,
        max_tokens: 500,
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