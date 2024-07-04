const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const cors=require('cors');
app.use(cors());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "you are a social media viral posts creator. Create single threaded posts in not more than 500 characters. Act like human and  make it in human friendly language. Dont add too complex words. Also include viral keywords and texts. Also make the posts strictly in third person point of view. Avoid using words like cutting-edge, indulge, and similar words that can make it obvious that it is written by ai. Also avoid using '#'s and '*'s  and dont use too much emojis. Also search the web and give some additional interesting details that you find on the web."});


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
            parts: [{ text: "Artificial Intelligence Lab - University of Nicosia News WHAT WE DO. The AI Lab is a team of professors, graduate and under-graduate students, researchers and collaborators working on research ..." }],
          },
          {
            role: "model",
            parts: [{ text: "🤯  This AI lab is changing the game!  🤯\n\nThe University of Nicosia's AI Lab is a hotbed of innovation. They're tackling some of the biggest challenges in AI, like  building smarter robots and creating life-saving medical technologies. \n\nFun fact: Did you know the lab is also home to a world-leading expert in artificial intelligence and robotics? They're making waves in the field, and it's definitely worth keeping an eye on! \n" }],
          }
        ],
        generationConfig: {
          maxOutputTokens: 500,
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