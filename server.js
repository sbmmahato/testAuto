const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const cors=require('cors');
app.use(cors());

const arrImage=[
  'https://images.ctfassets.net/lzny33ho1g45/2olcy4TVSWAjqy5dsxLNZd/c9e889eebe44cebf52990f09270ac2d4/best-image-generators.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760',
  'https://miro.medium.com/v2/resize:fit:1400/0*SX1wk6SnUterB4n8',
  'https://aicontentexpert.co.uk/wp-content/uploads/2024/02/AI-Tool-Finder-Discover-The-Perfect-AI-Tool-For-Your-Needs-1024x576.png',
  'https://img.etimg.com/thumb/width-420,height-315,imgsize-440978,resizemode-75,msid-108654079/news/company/corporate-trends/the-new-ai-disruption-tool-devine-or-devil-for-software-engineers.jpg',
  'https://media.licdn.com/dms/image/D4D12AQHtNPrU1ReSGg/article-cover_image-shrink_600_2000/0/1689416513131?e=2147483647&v=beta&t=7g-ElgA6STeyCcO0Okwdxnw_Ou_dXCNn5mH1zjnXgHI',
  'https://static.wixstatic.com/media/9d806f_5bccf0bd9f5e4ebeb944e6901dfd93ca~mv2.png/v1/fill/w_596,h_596,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9d806f_5bccf0bd9f5e4ebeb944e6901dfd93ca~mv2.png'
];

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "you are a social media viral posts creator. Create a post in STRICTLY not more than 470 characters. Act like human and  make it in human friendly language. Dont add too complex words. Also include viral keywords and texts. Also make the posts strictly in third person point of view. Avoid using words like 'cutting-edge', 'indulge', and similar words that can make it obvious that it is written by AI. Also strictly dont use '#'s and '*'s  and dont use too much emojis. You can include a maximum of only  2 emojis, strictly not more than that. Also search the web and give some additional interesting details that you find on the web. THE POST MUST STRICTLY BE LESS THAN 470 CHARACTERS."});


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
  const randomElement = arrImage[Math.floor(Math.random() * arrImage.length)];
//   res.send('Hello World!');
let val=await req.query.val;
let x=await auto(val);
return await res.json({
  text:x,
  image:randomElement
});
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

  //