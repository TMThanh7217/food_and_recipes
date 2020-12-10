const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;
var models = require('./Database/models');

app.use(express.static(__dirname + "/public"));

let exprHbs = require("express-handlebars");
const { type } = require('os');
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
    models.Recipe
    .findAll({
        raw: true
    }) 
    .then(function(data) {
        var recipe = data;
        console.log(typeof(data));
        res.render('recipes', {recipes: recipe, mssv:18127130, name:'Tran Phuoc Loc', mail:'18127130@student.hcmus.edu.vn'});
    })
    .catch(function(err) {
        res.json(err);
    })
});

app.get('/sync', function(req, res) {
    models.sequelize.sync().then(function() {
        res.send('Ahoy, Database sync completed');
    });
});

app.get('/ehe', function(req, res){
    console.log(models.Recipe);
    models.Recipe
        .findAll({})
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.json(err);
        })
});

app.listen(port,() => {
    console.log(`Server is listening at http://localhost:${port}`);
});
