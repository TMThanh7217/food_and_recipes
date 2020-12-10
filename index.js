const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=>{
    res.sendFile('/public/index.html');
});

app.listen(port,() => {
    console.log(`Server is listening at http://localhost:${port}`);
});
