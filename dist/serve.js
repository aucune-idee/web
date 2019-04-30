const express = require('express')
const app = express()

app.use(express.static('app'));

let port = process.env.PORT ? process.env.port : 8080;
const server = app.listen(port, ()=>{
  
    console.log('server started');
});