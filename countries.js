'use strict';

// include dependencies
const db = require('@scuba-squad/country-db');

const countries = db.map((country) => {
  if (country.postalCodeRegEx) {
    country.postalCodeRegEx = new RegExp(`^${country.postalCodeRegEx}$`, 'i');
  }

  return country;
});

// export as commonjs module
module.exports = countries;