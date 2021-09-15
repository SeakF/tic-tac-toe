const express = require('express')
const dotenv = require('dotenv')
const path = require('path')

const app = express()

dotenv.config()

app.use(express.static('../client'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
})

const port = process.env.PORT || 5501

app.listen(port, () => console.log(`app listen at port ${port}`))