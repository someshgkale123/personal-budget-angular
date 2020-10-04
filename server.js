const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let jsn=require('./budget.json');


app.get('/budget', (req,res)=>
{
    res.json(jsn);
});

app.listen(port,() =>
{
    console.log('API served at https://localhost:'+port)
});
