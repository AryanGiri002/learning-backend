import express from "express"
import 'dotenv/config'

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/twitter', (req, res) => {
    res.send('hiteshdotcom')
})

app.get('/login', (req, res) => {
    res.send('<h1>login goes here!</h1>')
})

app.get('/youtube', (req, res) => {
    res.send('<h2>my youtube channel goes here!</h2>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
