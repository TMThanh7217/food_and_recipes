const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + "/public"));

let exprHbs = require("express-handlebars");
let hbs = exprHbs.create({
    extname : "hbs",
    defaultLayout : 'main',
    layoutsDir : __dirname + '/views/layouts/',
    partialsDir : __dirname + '/views/partials/'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    res.locals.title = 'Group 11';
    res.render('index', {groupID : 11});
});

app.get('/recipes', (req, res)=>{
    res.locals.title = '18127130';
    res.render('recipes', {mssv:18127130, name:'Tran Phuoc Loc', mail:'18127130@student.hcmus.edu.vn'});
});

app.listen(port,() => {
    console.log(`Server is listening at http://localhost:${port}`);
});
