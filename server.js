const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const apiKey = '3c7beffc06be8023be9a6040949de324'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null})
})

app.post('/', function (req, res) {
  let city = req.body.city
  let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+apiKey
  request(url, function(err, response, body) {
    if (err) {
      res.render('index', {weather: null, error: 'Error, please try again'})
      console.log(url)
    } else {
      let weather =JSON.parse(body)
      if (weather.main == undefined) {
        res.render('index', {weather: null, error: 'Error, please try again'})
        console.log('s: ' + url)
      } else {
        let weatherText = 'It is ' + weather.main.temp + ' degrees in ' + weather.name + '!'
        res.render('index', {weather: weatherText, error: null})
      }
    }
  })
})