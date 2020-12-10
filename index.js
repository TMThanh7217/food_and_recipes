const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;
var models = require('./Database/models');

app.use(express.static(__dirname + "/public"));

let exprHbs = require("express-handlebars");
var isOdd = (num) => {
    return Number(num) % 2 != 0;
}
let hbs = exprHbs.create({
    extname : "hbs",
    defaultLayout : 'main',
    layoutsDir : __dirname + '/views/layouts/',
    partialsDir : __dirname + '/views/partials/',
    helpers : {
        isOdd : isOdd
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
    res.locals.title = 'Group 11';
    res.render('index', {groupID : 11});
});

app.get('/index', (req, res)=>{
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
        for(let i = 0; i < recipe.length; ++i) {
            models.Ingredient
            .findAll({
                raw : true,
                where : {
                    RecipeId : recipe[i].id
                }
            })
            .then(function (ing_data) {
                recipe[i].ing = ing_data;
                
            })
            .catch(function (err) {
                res.json(err)
            })
        }

        res.render('recipes', {recipes: recipe, mssv:18127130, name:'Tran Phuoc Loc', mail:'18127130@student.hcmus.edu.vn'});
    })
    .catch(function(err) {
        res.json(err);
    })
});

app.get('/featured', function(req, res){
    res.locals.title = '18127217';
    var product_data = {};
    models.Recipe
    .findAll({
        raw:true,
        where: {
            id: Number(req.query.id)
        }
    })
    .then(function(data){
        //console.log(data[0])
        product_data.recipe = data[0]
        console.log(product_data)
        models.Ingredient
        .findAll({
            raw:true,
            where: {
                RecipeId: product_data.recipe.id
            }
        })
        .then(function(data){
            product_data.ingredient = data
            models.Direction
            .findAll({
                raw:true,
                where: {
                    RecipeId: product_data.recipe.id
                }
            })
            .then(function(data){
                console.log(data)
                product_data.direction = data
                res.render('featured', {product_data, mssv:18127217, name:'Trinh Minh Thanh', mail:'18127217@student.hcmus.edu.vn'});
            })
            .catch(function(err){
                res.json(err)
            })
        })
        .catch(function(err){
            res.json(err)
        })
    })
    .catch(function(err){
        res.json(err)
    });
});

app.get('/sync', function(req, res) {
    models.sequelize.sync().then(function() {
        res.send('Database sync completed');
    });
});

app.get('/ehe', function(req, res){
    //console.log(models.Recipe);
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
