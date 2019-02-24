const request = require('request')


var getWeatherInfo =
    (lattitude, longitude, callback) => {
        /**
         * 1. options of the request
         * 2. handler function, i.e API response handler
         */
        request({
            url: `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lattitude},${longitude}`,
            json: true // this cofirms that response will be in json
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            } else {
                callback('Some error occured in weather API');
            }
        });
    };


module.exports.getWeatherInfo = getWeatherInfo;