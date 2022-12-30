// Create a react component that inputs a textarea message then performs a fetch request to localhost:3001 gets back a response as a data.message and displays that message in a box below. Have a separate button that when clicking signals to the backend that a user question has been asked, rather than just text. 
//

// Path: src\App.js

import React, { useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    organization: "org-Tp1wF8jaCJ2iV7r5alT4EQBX",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt:  
        `${message}`,
        max_tokens: 500,
        temperature: 0,
    });
    console.log(response.data);
    if (response.data.choices[0].text) {
        setResponse(response.data.choices[0].text);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <textarea onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
}

export default App;


