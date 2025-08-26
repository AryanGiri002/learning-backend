import 'dotenv/config';
import express from "express"
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req,res)=>{
    res.send('this is my twitter ID - AryanGiri_twts')
})

app.get('/login',(req,res)=>{
    res.send('<h1>Please Login Here!</h1>')
})

app.get('/youtube',(req,res)=>{
    res.send("<a href='https://www.youtube.com/@chaiaurcode' target='_main'>Click on this to go to ChaiAurCode Youtube channel</a>")
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})