// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const userModel = require("./models/users");

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://localhost:27017/myFirstdb");
// //api for signup
// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "All fields are required." });
//   }
  
//   try {
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists." });
//     }
    
//     const user = await userModel.create({ name, email, password });
//     res.status(201).json("success");
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// //api for login
// app.post("/login", async (req, res) => {
//   //   const chech = userModel.findOne({ email: req.body.email });
//   //   if (!checl) console.log("username not found");
//   const { email, password } = req.body;
//   userModel.findOne({ email, password }).then((user) => {
//     if (user) {
//       if (user.password == password) {
//         res.json("success");
//       } else {
//         res.json("the password or email is incorrect!");
//       }
//     } else {
//       res.json("no acconnt existed");
//     }
//   });
// });
// const port = 5002;
// app.listen(port, () => {
//   console.log(`server running on port  ${port}`);
// });
// app.use(cors({ origin: "http://localhost:5173" })); // Adjust port as needed
// express js index.js



const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Proxy route to call Python API
app.post("/api/recommend", async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const response = await axios.post("http://127.0.0.1:8000/recommend", req.body);
    console.log("Response from Python API:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error details:", error.message);
    if (error.response) {
      console.error("Python API response:", error.response.data);
      res.status(error.response.status).json({
        error: "Error from Python API",
        details: error.response.data
      });
    } else {
      res.status(500).json({
        error: "Error fetching recommendations",
        message: error.message
      });
    }
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// import express from 'express';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import OpenAI from 'openai';
// import cors from 'cors';

// dotenv.config();

// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());
// app.use(cors()); // Allow CORS for the frontend to communicate with the backend

// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: process.env.OPENROUTER_API_KEY,
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:5173',
//     'X-Title': 'Movie Mood Matcher',
//   },
// });

// app.post('/api/recommend', async (req, res) => {
//   try {
//     // ... existing code ...
//     const { emotion, mood, mood_intensity, stress_level, genres } = req.body;

//     const messages = [
//       {
//         role: 'user',
//         content: `Based on the user's preferences: 
//         Emotion: ${emotion}, Mood: ${mood}, Intensity: ${mood_intensity}, 
//         Stress Level: ${stress_level}, Genres: ${genres.join(', ')}, 
//         recommend 3 movies in the following JSON format: 
//         [
//           {
//             "Title": "Movie Title",
//             "Score": 0.95,
//             "Genre": ["Genre1", "Genre2"],
//             "Emotion": "Emotion",
//             "Mood": "Mood"
//           }
//         ]`,
//       },
//     ];
//     const completion = await openai.chat.completions.create({
//       model: 'openai/gpt-3.5-turbo',
//       messages,
//       max_tokens: 1000, 
//     }).catch(error => {
//       console.error('OpenAI API Error:', error);
//       throw new Error('Failed to communicate with AI service');
//     });

//     // Add proper validation
//     if (!completion?.choices?.[0]?.message?.content) {
//       console.error('Invalid API response structure:', completion);
//       return res.status(500).json({ message: 'Invalid response from AI service' });
//     }

//     const aiResponse = completion.choices[0].message.content;
//     // Parse the JSON response safely
//     let recommendations;
//     try {
//       recommendations = JSON.parse(aiResponse);
//       if (!Array.isArray(recommendations)) {
//         throw new Error('Expected an array of recommendations');
//       }
//     } catch (error) {
//       console.error('Error parsing AI response:', error, aiResponse);
//       return res.status(500).json({ 
//         message: 'Failed to parse AI recommendations',
//         error: error.message
//       });
//     }
//     return res.json({ recommendations });

//     // ... rest of your code ...
//   } catch (error) {
//     console.error('Full error:', error);
//     res.status(500).json({ 
//       message: 'Error fetching recommendations.',
//       error: error.message
//     });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
