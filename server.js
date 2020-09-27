const express = require('express');
const { title } = require('process');
const app = express();
const port = 3000;

app.use('/',express.static('public'));

const budget = {myBudget: [
    {
        title: 'Eat Out',
        budget: 25
    },
    {
        title: 'Rent',
        budget: 350
    },
    {
        title: 'Grocery',
        budget: 150
    },
]};

app.get('/hello', (req, res) => 
{
    res.send('Hello World!');
});

app.get('/budget', (req,res)=>
{
    res.json(budget);
});

app.listen(port,() =>
{
    console.log('App listening at https://localhost:'+port)
});
