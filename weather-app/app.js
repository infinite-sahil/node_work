const yargs = require('yargs');
const geocode = require('./geo-code/geocode');
const weather = require('./weather/weather');

// to get the environment configurations
require('dotenv').config();

// configuring user input and command help parameters
const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true // this tell always parse this address argument as string
        }
    })
    .help()
    .alias('help', 'h') // configured alias for help
    .argv;

/**
 ** Entry point ********************
 * This function fetches the geo code for the input address
 * 1. input address
 * 2. callback function
 */
geocode.geoCodeAddress(
    argv.address, // 1. user input address 
    (errorMessage, results) => { // 2. callback function
        if (errorMessage) console.log(errorMessage);
        else {
            weather.getWeatherInfo(results.lattitude, results.longitude, (errorMessage, results) => {
                if (errorMessage) console.log(errorMessage);
                else console.log(JSON.stringify(results, undefined, 2));
            });
        }
    });