const yargs = require('yargs');
const axios = require('axios');

// to get the environment configurations
require('dotenv').config();

// configuring user input and command help parameters
const argv = yargs
    .options({
        address: {
            demand: true, // its mandatory
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true // this tell always parse this address argument as string
        }
    })
    .help()
    .alias('help', 'h') // configured alias for help
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.API_KEY}&location=${encodedAddress}`;

axios.get(geoCodeUrl)
    .then((response) => {
        const respStatusCode = response.status;
        if (respStatusCode != 200 || (respStatusCode === 200 && response.data.info.statuscode != 0))
            throw new Error('Unable to find the address');

        let lattitude = response.data.results[0].locations[0].displayLatLng.lat;
        let longitude = response.data.results[0].locations[0].displayLatLng.lng;
        return axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lattitude},${longitude}`);
    })
    .then((response) => {
        console.log(`It's currently, Temperature: ${response.data.currently.temperature} and Apparent Temperature: ${response.data.currently.apparentTemperature}`)
    })
    .catch((err) => console.log(err));