const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const axios = require('axios');

require('dotenv').config();
let apiKey = process.env.API_KEY;


app.set('view engine','hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res) => {
    res.render('index',{weather:null,err:null});
});

app.post('/',(req,res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    axios.get(url)
    .then((response) => {
        let weatherText = `It's ${response.data.main.temp} fahrenheit in ${response.data.name}!`;
        res.render('index', {weather: weatherText, err: null});
    })
    .catch((err) => {
        res.render('index', {weather: null, err: 'Error, please try again'});
    });
});


app.listen(port);