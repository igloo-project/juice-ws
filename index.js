const express = require('express')
const juice = require('juice')
const app = express()

app.use(express.json())

app.get('/juice', (req,res) => {
    res.send(juice(req.body.content, req.body.options))
})

app.listen(8080, () => {
  console.log('Listening...')
})

