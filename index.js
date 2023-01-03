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
    /*AsyncTest.testFxn().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });*/
    // Wait for the slices array to be generated
    console.log("Opening getSlices...");
    WebScrape.getSlices().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
    console.log("Slices array generated...");

    // Get the value of the first slice in the array
    //const slice = slices[0];

    // Use the slice value in your code
    //console.log(slice);

    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 250,
        temperature: 0,
    });
    console.log(response.data);
    if (response.data.choices[0].text) {
        res.json({
            message: response.data.choices[0].text
        });
    }
    //console.log(slices[0]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

