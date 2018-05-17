(function() {
  var countries, unit;

  unit = require('unit.js');

  countries = require('../countries');

  describe('countries', function() {
    return it('should be an array of v object literals', function() {
      unit.array(countries).hasLength(249).matchEach(function(v) {
        return !!(v.name && v.iso2Code && v.iso3Code && v.isoNumericCode);
      });
      return null;
    });
  });

}).call(this);
