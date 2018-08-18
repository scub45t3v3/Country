'use strict';

(() => {
  // include dependencies
  const unit = require('unit.js');
  const countries = require('../countries');

  // describe countries
  describe('countries', () => {
    it('should be an array of object literals', () => {
      unit
        .array(countries)
        .hasLength(249)
        .matchEach((v) => {
          return !!(v.name && v.iso2Code && v.iso3Code && v.isoNumericCode);
        });
    }); // end it
  }); // end describe countries
})(); // end IIFE