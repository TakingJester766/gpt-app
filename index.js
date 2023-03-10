// A express server, which will handle api requests come in and respond with a json object, it will use body parser as well as cors to handle the requests.


// You can now call the getSlices function in other files like this:
const { testFxn } = require('./src/AsyncTest.js');
const { getSlices } = require('./src/WebScrape.js');
const config = require('./config.js');
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AsyncTest = require('./src/AsyncTest.js');
const WebScrape = require('./src/WebScrape.js');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: config.organization,
    apiKey: config.apiKey
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    try {
        const slices = await WebScrape.getSlices();
        try {
            const { message } = req.body;
            const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You will be given a block of text. Following this block of text, the user will prompt you with a question. Answer it as best you can. 
                
                \n\n${slices[0]}\n\n
            
                user question: ${message}`,
            max_tokens: 250,
            temperature: 0,
            });
            console.log(response.data);
            if (response.data.choices[0].text) {
                res.json({
                message: response.data.choices[0].text
                });
            }
        } catch(err) {
            console.log(err);
        }
    } catch(err) {
        console.log(err);
    }
    //console.log(slices[0]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

