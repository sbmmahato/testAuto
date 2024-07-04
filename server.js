const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const cors=require('cors');
app.use(cors());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();})

app.get('/startautomation', async (req, res) => {
//   res.send('Hello World!');
let val=await req.query.val;
let x=await auto(val);
return await res.json({text:x});
});





async function auto(message) {
    const chat =await model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "you are a dog expert" }],
          }
        ],
        generationConfig: {
          maxOutputTokens: 100,
        },
      });
    // let message= 'what is a dog'
      const msg = `${message}`;
    
      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const text =await response.text();
      console.log(text);

      return text;
  }




  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });