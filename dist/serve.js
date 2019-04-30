const express = require('express')
const app = express()

app.use(express.static(__dirname + '/app'));

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

let port = process.env.PORT ? process.env.port : 8080;
const server = app.listen(port, ()=>{
    console.log('server started');
});