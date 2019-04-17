const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const api = require('./utils')

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views/');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});

app.use((request, response, next) => {
    var time = new Date().toString();
    // console.log(`${time}: ${request.method} ${request.url}`);
    var log = `${time}: ${request.method} ${request.url} `;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to log message');
        }
    });
    next();
});

app.get('/', (request, response) => {
    //response.send('<h1>Hello Express!</h1>');
    response.render('homepage.hbs')
    ;
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.post('/nasasearch', (request, response) => {
//    var search = request.body.search;
    api.getImage('mars').then((result) => {
        response.render('nasasearch.hbs', {
            images: result.image
    });
    })
});

app.get('/nasa', (request, response) => {
    response.render('nasa.hbs')
});

app.get('/card', (request, response) => {
    response.render('card.hbs');
});

app.post('/cardsearch', (request, response) => {
//    var count = request.body.card;
    api.getCard(5).then((result) => {
        response.render('cardsearch.hbs', {
            cards: result.card
        })
    })
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not Found'
    })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});
