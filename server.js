const express = require('express');
const { title } = require('process');
const app = express();
const port = 3000;

app.use('/',express.static('public'));

let jsn=require('./budget.json');


app.get('/hello', (req, res) => 
{
    res.send('Hello World!');
});

app.get('/budget', (req,res)=>
{
    res.json(jsn);
});

app.listen(port,() =>
{
    console.log('App listening at https://localhost:'+port)
});
