const request = require('request');


var getCard = (count) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://deckofcardsapi.com/api/deck/new/draw/?count=${count}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Error: Cannot connect to Cards');
            } else if (body.success == false) {
                reject('Error: Cannot find requested address');
            } else if (body.success == true) {
                resolve({
                    card: JSON.stringify(body.cards)
                });
            } else {
               reject('ERROR ERROR ERROR');
            }
        });
    });
};

var getImage = (search) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://images-api.nasa.gov/search?q=${search}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Error: Cannot connect to NASA');
            } else if (body.collection.metadata.total_hits == 0){
                reject(`Cannot find ${search}`);
            }else if (body.collection.metadata.total_hits != 0) {
                console.log(body)
                resolve({
                  image: (`https://images-assets.nasa.gov/image/PIA07081/PIA07081~thumb.jpg`)
                });
            }
        });
    });
};

module.exports = {
    getImage,
    getCard
};