// '1301 lombard street philadelphia'
const request = require('request')

/**
 * 
 * @param {*} address : input from the user
 * @param {*} callback : this actually handles scenerios, kind of function body as paramter (similar to lambda for *                       java person)
 */
var geoCodeAddress =
    (address, callback) => {
        const encodedAddress = encodeURIComponent(address);
        /**
         * 1. options of the request
         * 2. handler function, i.e API response handler
         */
        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.API_KEY}&location=${encodedAddress}`,
            json: true // this cofirms that response will be in json
        }, (error, response, body) => {
            const respStatusCode = response.statusCode;
            if (error) {
                callback('Somethig went wrong with the location API');
            } else if (respStatusCode != 200 || (respStatusCode === 200 && body.info.statuscode != 0)) {
                callback('Unable to find the address');
            } else if (body.info.statuscode === 0) {
                callback(undefined, { // creating address response object
                    address: body.results[0].providedLocation.location,
                    lattitude: body.results[0].locations[0].displayLatLng.lat,
                    longitude: body.results[0].locations[0].displayLatLng.lng
                });
            }
        });
    };


module.exports = {
    geoCodeAddress
};