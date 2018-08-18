'use strict';

(() => {
  // include dependencies
  const _ = require('underscore');
  const db = require('@scuba-squad/country-db');

  const countries = _.map(db, (country) => {
    if (country.postalCodeRegEx) {
      country.postalCodeRegEx = new RegExp(`^${country.postalCodeRegEx}$`, 'i');
    }

    return country;
  });

  // export as commonjs module
  module.exports = countries;
})(); // end IIFE