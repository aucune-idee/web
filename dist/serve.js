const express = require('express')
const app = express()

app.use(express.static('app'));

let port = process.env.PORT ? process.env.port : 8080;
app.listen(port, ()=>{
    const host = server.address().address;
    const port = server.address().port;
  
    console.log(`Example app listening at http://${host}:${port}`);
});