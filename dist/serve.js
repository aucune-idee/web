const express = require('express')
const app = express()

app.use(express.static('app'));

app.listen(process.env.PORT ? process.env.port : 8080);