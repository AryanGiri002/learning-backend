import express from 'express';
import 'dotenv/config'
import cors from 'cors'


/*
| Feature         | require (CommonJS)                                                                   | import (ES Modules / ESM)                                                    |
|-----------------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| example         | const express = require('express');                                                  | import express from 'express';                                               |
| System          | CommonJS (CJS) - The original system built for Node.js.                              | ES Modules (ESM) - The official standard for all JavaScript.                 |
| Execution       | Synchronous - The code stops and waits for the file to be loaded.                    | Asynchronous - Can load modules in parallel without blocking.                |
| When it Loads   | Dynamic - You can call require() anywhere in your code (e.g., in an `if` statement). | Static - `import` statements are "hoisted" and must be at the top level.     |
| How it Works    | Loads the entire module.exports object from the target file.                         | Can selectively load only the pieces you need (named exports).               |

*/



const app = express();
app.use(cors({origin: 'http://localhost:5174'}))
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send("Server is ready!");
})

app.get('/jokes',(req,res)=>{
    const jokes_array = [
  {
    "id": 1,
    "title": "A bad pun",
    "content": "I told my computer I needed a break, and now it won’t stop sending me pictures of Kit Kat bars."
  },
  {
    "id": 2,
    "title": "A fish joke",
    "content": "Why don't fish play piano? Because you can't tuna fish."
  },
  {
    "id": 3,
    "title": "A math joke",
    "content": "What do you call a number that can’t keep still? A roamin' numeral."
  },
  {
    "id": 4,
    "title": "A lightbulb joke",
    "content": "How many programmers does it take to change a lightbulb? None, that's a hardware problem."
  },
  {
    "id": 5,
    "title": "A ghost joke",
    "content": "Why did the ghost go to the bar? For the boos."
  }]
    res.send(jokes_array)
})

app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`);
})