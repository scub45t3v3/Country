// include dependencies
import unit from 'unit.js';
import countries from '../countries.js';

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