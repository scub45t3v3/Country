(function() {
  var Country, noop, unit, version;

  unit = require('unit.js');

  ({noop} = require('underscore'));

  Country = require('../Country');

  ({version} = require('../package'));

  describe('Country', function() {
    it('should be a function', function() {
      unit.function(Country);
      return null;
    });
    it('should return an instance of Country', function() {
      unit.object(new Country()).isInstanceOf(Country).isEnumerable('name').isEnumerable('iso2Code').isEnumerable('iso3Code').isEnumerable('isoNumericCode').isEnumerable('callingCode').hasProperty('postalCodeRegEx').hasProperty('VERSION', version);
      return null;
    });
    describe('#VERSION', function() {
      return it('should be a constant property', function() {
        var test;
        test = new Country();
        unit.string(test.VERSION).is(version);
        return null;
      });
    });
    describe('#getByIso2Code', function() {
      it('should be a static function', function() {
        unit.function(Country.getByIso2Code);
        return null;
      });
      it('should return an instance of Country for known iso code', function() {
        unit.object(Country.getByIso2Code('US')).isInstanceOf(Country);
        return null;
      });
      return it('should return false for unknown iso code', function() {
        unit.bool(Country.getByIso2Code('AA')).isFalse();
        return null;
      });
    });
    describe('#getByIso3Code', function() {
      it('should be a static function', function() {
        unit.function(Country.getByIso3Code);
        return null;
      });
      it('should return an instance of Country for known iso code', function() {
        unit.object(Country.getByIso3Code('USA')).isInstanceOf(Country);
        return null;
      });
      return it('should return false for unknown iso code', function() {
        unit.bool(Country.getByIso3Code('AAA')).isFalse();
        return null;
      });
    });
    describe('#getByIsoNumericCode', function() {
      it('should be a static function', function() {
        unit.function(Country.getByIsoNumericCode);
        return null;
      });
      it('should return an instance of Country for known iso code', function() {
        unit.object(Country.getByIsoNumericCode('004')).isInstanceOf(Country);
        return null;
      });
      return it('should return false for unknown iso code', function() {
        unit.bool(Country.getByIsoNumericCode('000')).isFalse();
        return null;
      });
    });
    describe('#getByPostalCode', function() {
      it('should be a static function', function() {
        unit.function(Country.getByPostalCode);
        return null;
      });
      it('should return an array of Country objects who match the given postal code', function() {
        var postalCode;
        postalCode = '55555';
        unit.array(Country.getByPostalCode(postalCode)).isNotEmpty().matchEach(function(value) {
          return value.isValidPostalCode(postalCode);
        });
        return null;
      });
      it('should return an array of Country objects with no postal code when given null', function() {
        unit.array(Country.getByPostalCode()).isNotEmpty().matchEach(function(value) {
          return !value.postalCodeRegEx;
        });
        return null;
      });
      return it('should return false for no known Country with a matching postal code', function() {
        unit.bool(Country.getByPostalCode('A')).isFalse();
        return null;
      });
    });
    describe('#getByCallingCode', function() {
      it('should be a static function', function() {
        unit.function(Country.getByCallingCode);
        return null;
      });
      it('should return an array of country objects who match the given calling code', function() {
        var callingCode;
        callingCode = '1';
        unit.array(Country.getByCallingCode(callingCode)).isNotEmpty().matchEach(function(value) {
          return value.hasCallingCode(callingCode);
        });
        return null;
      });
      return it('should return false for no known Country with a matching calling code', function() {
        unit.bool(Country.getByCallingCode('123445')).isFalse();
        return null;
      });
    });
    describe('#name', function() {
      it('should accept undefined', function() {
        var test;
        test = new Country();
        unit.given(test.name = void 0).undefined(test.name);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new Country();
        unit.given(test.name = null).undefined(test.name);
        return null;
      });
      it('should accept a string', function() {
        var test;
        test = new Country();
        unit.given(test.name = 'some name').string(test.name);
        return null;
      });
      it('should accept stringifiable array', function() {
        var test;
        test = new Country();
        unit.given(test.name = ['united', ' ', 'states']).string(test.name).is('united, ,states').given(test.name = ['a']).string(test.name).is('a').given(test.name = ['a', 'b', 'c']).string(test.name).is('a,b,c');
        return null;
      });
      it('should accept stringifiable objects', function() {
        var test;
        test = new Country();
        unit.given(test.name = 123).string(test.name).given(test.name = new Date()).string(test.name).given(test.name = /a/i).string(test.name);
        return null;
      });
      return it('should throw and Error for non stringifiable objects', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.name = {
            toString: false,
            nope: true
          };
        });
        return null;
      });
    });
    describe('#iso2Code', function() {
      it('should accept undefined', function() {
        var test;
        test = new Country();
        unit.given(test.iso2Code = void 0).undefined(test.iso2Code);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new Country();
        unit.given(test.iso2Code = null).undefined(test.iso2Code);
        return null;
      });
      it('should accept a 2 char string', function() {
        var test;
        test = new Country();
        unit.given(test.iso2Code = 'aa').string(test.iso2Code).is('AA').given(test.iso2Code = 'US').string(test.iso2Code).is('US');
        return null;
      });
      it('should accept stringifiable array', function() {
        var test;
        test = new Country();
        unit.given(test.iso2Code = ['us']).string(test.iso2Code).is('US').given(test.iso2Code = ['aa']).string(test.iso2Code).is('AA').given(test.iso2Code = ['gb']).string(test.iso2Code).is('GB');
        return null;
      });
      it('should throw an error for any non 2 char string', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.iso2Code = 'asd';
        }).error(function() {
          return test.iso2Code = 'a';
        });
        return null;
      });
      return it('should throw an error for any non alpha 2 char strings', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.iso2Code = 123;
        }).error(function() {
          return test.iso2Code = 12;
        }).error(function() {
          return test.iso2Code = 'a3';
        });
        return null;
      });
    });
    describe('#iso3Code', function() {
      it('should accept undefined', function() {
        var test;
        test = new Country();
        unit.given(test.iso3Code = void 0).undefined(test.iso3Code);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new Country();
        unit.given(test.iso3Code = null).undefined(test.iso3Code);
        return null;
      });
      it('should accept a 2 char string', function() {
        var test;
        test = new Country();
        unit.given(test.iso3Code = 'aaa').string(test.iso3Code).is('AAA').given(test.iso3Code = 'USa').string(test.iso3Code).is('USA');
        return null;
      });
      it('should accept stringifiable array', function() {
        var test;
        test = new Country();
        unit.given(test.iso3Code = ['usa']).string(test.iso3Code).is('USA').given(test.iso3Code = ['aaa']).string(test.iso3Code).is('AAA').given(test.iso3Code = ['gbr']).string(test.iso3Code).is('GBR');
        return null;
      });
      it('should throw an error for any non 3 char string', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.iso3Code = 'a';
        }).error(function() {
          return test.iso3Code = 'as';
        }).error(function() {
          return test.iso3Code = 'aabb';
        });
        return null;
      });
      return it('should throw an error for any non alpha 3 char strings', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.iso3Code = 123;
        }).error(function() {
          return test.iso3Code = 12;
        }).error(function() {
          return test.iso3Code = 'a3';
        });
        return null;
      });
    });
    describe('#isoNumericCode', function() {
      it('should accept undefined', function() {
        var test;
        test = new Country();
        unit.given(test.isoNumericCode = void 0).undefined(test.isoNumericCode);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new Country();
        unit.given(test.isoNumericCode = null).undefined(test.isoNumericCode);
        return null;
      });
      it('should accept a 3 char numeric string', function() {
        var test;
        test = new Country();
        unit.given(test.isoNumericCode = '045').string(test.isoNumericCode).is('045').given(test.isoNumericCode = '372').string(test.isoNumericCode).is('372');
        return null;
      });
      it('should accept stringifiable array', function() {
        var test;
        test = new Country();
        unit.given(test.isoNumericCode = ['563']).string(test.isoNumericCode).is('563').given(test.isoNumericCode = ['111']).string(test.isoNumericCode).is('111').given(test.isoNumericCode = ['825']).string(test.isoNumericCode).is('825');
        return null;
      });
      it('should accept stringifiable objects', function() {
        var test;
        test = new Country();
        unit.given(test.isoNumericCode = 123).string(test.isoNumericCode);
        return null;
      });
      return it('should throw an error for any non numeric 3 char string', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.isoNumericCode = 'a';
        }).error(function() {
          return test.isoNumericCode = 'as';
        }).error(function() {
          return test.isoNumericCode = 'aabb';
        }).error(function() {
          return test.isoNumericCode = 1;
        }).error(function() {
          return test.isoNumericCode = 12;
        }).error(function() {
          return test.isoNumericCode = 'a3';
        });
        return null;
      });
    });
    describe('#postalCodeRegEx', function() {
      it('should accept undefined', function() {
        var test;
        test = new Country();
        unit.given(test.postalCodeRegEx = void 0).undefined(test.postalCodeRegEx);
        return null;
      });
      it('should accept null', function() {
        var test;
        test = new Country();
        unit.given(test.postalCodeRegEx = null).value(test.postalCodeRegEx).isNull();
        return null;
      });
      it('should accept a regular expression', function() {
        var test;
        test = new Country();
        unit.given(test.postalCodeRegEx = /^a34$/).regexp(test.postalCodeRegEx).given(test.postalCodeRegEx = new RegExp('555')).regexp(test.postalCodeRegEx);
        return null;
      });
      it('should throw an error for strings', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.postalCodeRegEx = 'hi';
        }).error(function() {
          return test.postalCodeRegEx = 'dsfkjh';
        }).error(function() {
          return test.postalCodeRegEx = '/555/';
        }).error(function() {
          return test.postalCodeRegEx = '^5$';
        });
        return null;
      });
      it('should throw an error for numbers', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.postalCodeRegEx = 5;
        }).error(function() {
          return test.postalCodeRegEx = 3.4;
        }).error(function() {
          return test.postalCodeRegEx = -1;
        }).error(function() {
          return test.postalCodeRegEx = -435.67;
        });
        return null;
      });
      it('should throw an error for arrays', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.postalCodeRegEx = [/34/, '45', 76];
        }).error(function() {
          return test.postalCodeRegEx = [/34/];
        }).error(function() {
          return test.postalCodeRegEx = ['45'];
        }).error(function() {
          return test.postalCodeRegEx = [76];
        });
        return null;
      });
      return it('should throw an error for objects', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.postalCodeRegEx = {
            a: '5',
            b: /45/,
            c: [56, 78],
            d: 5.5,
            e: 3
          };
        }).error(function() {
          return test.postalCodeRegEx = {
            a: /45/
          };
        }).error(function() {
          return test.postalCodeRegEx = {
            a: 'hi'
          };
        }).error(function() {
          return test.postalCodeRegEx = {
            a: [5, 7]
          };
        }).error(function() {
          return test.postalCodeRegEx = {
            a: 5.5
          };
        }).error(function() {
          return test.postalCodeRegEx = {
            a: 4
          };
        });
        return null;
      });
    });
    describe('#callingCode', function() {
      it('should accept undefined', function() {
        var test;
        test = new Country();
        unit.given(test.callingCode = void 0).undefined(test.callingCode);
        return null;
      });
      it('should accept null', function() {
        var test;
        test = new Country();
        unit.given(test.callingCode = null).value(test.callingCode).isNull();
        return null;
      });
      it('should accept numeric string', function() {
        var test;
        test = new Country();
        unit.given(test.callingCode = '1').array(test.callingCode).is(['+1']);
        return null;
      });
      it('should accept an integer', function() {
        var test;
        test = new Country();
        unit.given(test.callingCode = 35).array(test.callingCode).is(['+35']);
        return null;
      });
      it('should accept an array of numberic strings and/or integers', function() {
        var test;
        test = new Country();
        unit.given(test.callingCode = ['1', '34', '8']).array(test.callingCode).is(['+1', '+34', '+8']).given(test.callingCode = [1, 45, 78]).array(test.callingCode).is(['+1', '+45', '+78']).given(test.callingCode = ['1', 33, '56']).array(test.callingCode).is(['+1', '+33', '+56']);
        return null;
      });
      it('should throw an error for non numberic strings', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.callingCode = 'asd';
        }).error(function() {
          return test.callingCode = '5648fb';
        }).error(function() {
          return test.callingCode = 'f746389';
        }).error(function() {
          return test.callingCode = '#$$^';
        }).error(function() {
          return test.callingCode = '$32486';
        });
        return null;
      });
      it('should throw an error for floats', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.callingCode = 6.5;
        }).error(function() {
          return test.callingCode = -45.6;
        }).error(function() {
          return test.callingCode = 0.6;
        }).error(function() {
          return test.callingCode = -0.4;
        });
        return null;
      });
      it('should throw an error for negative numbers', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.callingCode = -1;
        }).error(function() {
          return test.callingCode = -5;
        }).error(function() {
          return test.callingCode = -56;
        });
        return null;
      });
      return it('should throw an error for an array containting non numberic values', function() {
        var test;
        test = new Country();
        unit.error(function() {
          return test.callingCode = ['45', 't'];
        }).error(function() {
          return test.callingCode = [34, 7.7];
        }).error(function() {
          return test.callingCode = ['t'];
        }).error(function() {
          return test.callingCode = [{}, '5'];
        });
        return null;
      });
    });
    describe('#hasCallingCode', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.hasCallingCode);
        return null;
      });
      it('should return true for calling codes already in the array', function() {
        var test;
        test = new Country();
        test.callingCode = [1, 45, '87', '6 7'];
        unit.bool(test.hasCallingCode('1')).isTrue().bool(test.hasCallingCode('+45')).isTrue().bool(test.hasCallingCode(87)).isTrue().bool(test.hasCallingCode('+6 7')).isTrue();
        return null;
      });
      return it('should return false for calling codes not in the array', function() {
        var test;
        test = new Country();
        test.callingCode = 1;
        unit.bool(test.hasCallingCode(5)).isFalse().bool(test.hasCallingCode('+9')).isFalse().bool(test.hasCallingCode('6 7')).isFalse();
        return null;
      });
    });
    describe('#hasAnyCallingCodes', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.hasAnyCallingCodes);
        return null;
      });
      it('should return true if any calling code exists in the array', function() {
        var test;
        test = new Country();
        test.callingCode = [1, 45, '87', '6 7'];
        unit.bool(test.hasAnyCallingCodes(3, '1')).isTrue().bool(test.hasAnyCallingCodes(7, '+45')).isTrue().bool(test.hasAnyCallingCodes(10, 87)).isTrue().bool(test.hasAnyCallingCodes(6, '+6 7')).isTrue();
        return null;
      });
      return it('should return false if no calling code exists in the array', function() {
        var test;
        test = new Country();
        test.callingCode = 1;
        unit.bool(test.hasAnyCallingCodes(2, 3, 4, 5, 6, 7, 8, 9, 10)).isFalse().bool(test.hasAnyCallingCodes(23, '+9')).isFalse().bool(test.hasAnyCallingCodes(11, '6 7')).isFalse();
        return null;
      });
    });
    describe('#hasAllCallingCodes', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.hasAllCallingCodes);
        return null;
      });
      it('should return true if all calling codes exists in the array', function() {
        var test;
        test = new Country();
        test.callingCode = [1, 45, '87', '6 7'];
        unit.bool(test.hasAllCallingCodes(45, '1')).isTrue().bool(test.hasAllCallingCodes(87, '+45')).isTrue().bool(test.hasAllCallingCodes('6 7', 87)).isTrue().bool(test.hasAllCallingCodes(1, '+6 7')).isTrue();
        return null;
      });
      return it('should return false if any calling code does not exists in the array', function() {
        var test;
        test = new Country();
        test.callingCode = 1;
        unit.bool(test.hasAllCallingCodes(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).isFalse().bool(test.hasAllCallingCodes(1, 23, '+9')).isFalse().bool(test.hasAllCallingCodes(1, 11, '6 7')).isFalse();
        return null;
      });
    });
    describe('#addCallingCode', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.addCallingCode);
        return null;
      });
      return it('should add a calling code to the array', function() {
        var test;
        test = new Country();
        unit.given(test.addCallingCode('5')).array(test.callingCode).is(['+5']).given(test.addCallingCode('6 7')).array(test.callingCode).is(['+5', '+6 7']).given(test.addCallingCode(82)).array(test.callingCode).is(['+5', '+6 7', '+82']);
        return null;
      });
    });
    describe('#removeCallingCode', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.removeCallingCode);
        return null;
      });
      return it('should remove a calling code from the array', function() {
        var test;
        test = new Country();
        test.callingCode = [1, 45, '+6 7'];
        unit.given(test.removeCallingCode(1)).array(test.callingCode).is(['+45', '+6 7']).given(test.removeCallingCode('6 7')).array(test.callingCode).is(['+45']).given(test.removeCallingCode('45')).undefined(test.callingCode);
        return null;
      });
    });
    describe('#set', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.set);
        return null;
      });
      return it('should accept an obejct literal and set the properties defined', function() {
        var opt, test;
        test = new Country();
        opt = {
          name: 'test',
          iso2Code: 'TT',
          postalCodeRegEx: /^a$/i
        };
        unit.given(test.set(opt)).object(test).hasProperty('name', opt.name).hasProperty('iso2Code', opt.iso2Code).hasProperty('postalCodeRegEx', opt.postalCodeRegEx);
        return null;
      });
    });
    describe('#get', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.get);
        return null;
      });
      return it('should return an object literal with the provided properties', function() {
        var test;
        test = new Country();
        unit.given(test.name = 'fake').object(test.get('name')).hasLength(1).hasProperty('name', 'fake').given(test.iso2Code = 'AA').object(test.get('name', 'iso2Code')).hasLength(2).hasProperty('name', 'fake').hasProperty('iso2Code', 'AA').given(test.iso3Code = 'AAA').object(test.get(['name', 'iso2Code', 'iso3Code'])).hasLength(3).hasProperty('name', 'fake').hasProperty('iso2Code', 'AA').hasProperty('iso3Code', 'AAA').object(test.get('name', ['iso2Code', 'iso3Code'])).hasLength(3).hasProperty('name', 'fake').hasProperty('iso2Code', 'AA').hasProperty('iso3Code', 'AAA').object(test.get('nonExist', 'name', 'postalCode')).hasLength(1).hasProperty('name', 'fake');
        return null;
      });
    });
    return describe('#isValidPostalCode', function() {
      it('should be a function', function() {
        var test;
        test = new Country();
        unit.function(test.isValidPostalCode);
        return null;
      });
      it('should return true for postal codes that pass the postal code RegExp', function() {
        var test;
        test = Country.getByIso2Code('US');
        unit.bool(test.isValidPostalCode('12345')).isTrue().bool(test.isValidPostalCode('12345-1234')).isTrue().bool(test.isValidPostalCode('12345 1234')).isTrue().bool(test.isValidPostalCode('123456789')).isTrue();
        return null;
      });
      return it('should return false for postal codes that do not pass the postal code RegExp', function() {
        var test;
        test = Country.getByIso2Code('US');
        unit.bool(test.isValidPostalCode('1')).isFalse().bool(test.isValidPostalCode('1234')).isFalse().bool(test.isValidPostalCode('123456')).isFalse().bool(test.isValidPostalCode('1234567890')).isFalse().bool(test.isValidPostalCode('   ')).isFalse().bool(test.isValidPostalCode()).isFalse().bool(test.isValidPostalCode('1234t')).isFalse();
        return null;
      });
    });
  });

}).call(this);
