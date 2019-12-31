'use strict';

// include dependencies
const unit = require('unit.js');
const Country = require('../Country');
const {version} = require('../package');

// describe Country
describe('Country', () => {
  it('should be a function', () => {
    unit
      .function(Country);
  }); // end it

  it('should return an instance of Country', () => {
    unit
      .object(new Country())
      .isInstanceOf(Country)
      .isEnumerable('name')
      .isEnumerable('iso2Code')
      .isEnumerable('iso3Code')
      .isEnumerable('isoNumericCode')
      .isEnumerable('callingCode')
      .hasProperty('postalCodeRegEx')
      .hasProperty('VERSION', version);
  }); // end it

  // describe #VERSION
  describe('#VERSION', () => {
    it('should be a constant property', () => {
      const test = new Country();

      unit
        .string(test.VERSION)
        .is(version);
    });
  }); // end describe #VERSION

  // describe #getByIso2Code
  describe('#getByIso2Code', () => {
    it('should be a static function', () => {
      unit
        .function(Country.getByIso2Code);
    }); // end it

    it('should return an instance of Country for known iso code', () => {
      unit
        .object(Country.getByIso2Code('US'))
        .isInstanceOf(Country);
    }); // end it

    it('should return false for unknown iso code', () => {
      unit
        .bool(Country.getByIso2Code('AA'))
        .isFalse();
    }); // end it
  }); // end describe #getByIso2Code

  // describe #getByIso3Code
  describe('#getByIso3Code', () => {
    it('should be a static function', () => {
      unit
        .function(Country.getByIso3Code);
    }); // end it

    it('should return an instance of Country for known iso code', () => {
      unit
        .object(Country.getByIso3Code('USA'))
        .isInstanceOf(Country);
    }); // end it

    it('should return false for unknown iso code', () => {
      unit
        .bool(Country.getByIso3Code('AAA'))
        .isFalse();
    }); // end it
  }); // end describe#getByIso3Code

  // describe #getByIsoNumericCode
  describe('#getByIsoNumericCode', () => {
    it('should be a static function', () => {
      unit
        .function(Country.getByIsoNumericCode);
    }); // end it

    it('should return an instance of Country for known iso code', () => {
      unit
        .object(Country.getByIsoNumericCode('004'))
        .isInstanceOf(Country);
    }); // end it

    it('should return false for unknown iso code', () => {
      unit
        .bool(Country.getByIsoNumericCode('000'))
        .isFalse();
    }); // end it
  }); // end describe #getByIsoNumericCode

  // describe #getByPostalCode
  describe('#getByPostalCode', () => {
    it('should be a static function', () => {
      unit
        .function(Country.getByPostalCode);
    }); // end it

    it('should return an array of Country objects who match the given postal code', () => {
      const postalCode = '55555';

      unit
        .array(Country.getByPostalCode(postalCode))
        .isNotEmpty()
        .matchEach((value) => {
          return value.isValidPostalCode(postalCode);
        });
    }); // end it

    it('should return an array of Country objects with no postal code when given null', () => {
      unit
        .array(Country.getByPostalCode())
        .isNotEmpty()
        .matchEach((value) => {
          return !value.postalCodeRegEx;
        });
    }); // end it

    it('should return false for no known Country with a matching postal code', () => {
      unit
        .bool(Country.getByPostalCode('A'))
        .isFalse();
    }); // end it
  }); // end describe #getByPostalCode

  // describe #getByCallingCode
  describe('#getByCallingCode', () => {
    it('should be a static function', () => {
      unit
        .function(Country.getByCallingCode);
    }); // end it

    it('should return an array of country objects who match the given calling code', () => {
      const callingCode = '1';

      unit
        .array(Country.getByCallingCode(callingCode))
        .isNotEmpty()
        .matchEach((value) => {
          return value.hasCallingCode(callingCode);
        });
    }); // end it

    it('should return false for no known Country with a matching calling code', () => {
      unit
        .bool(Country.getByCallingCode('123445'))
        .isFalse();
    }); // end it
  }); // end describe #getByCallingCode

  // describe #name
  describe('#name', () => {
    it('should accept undefined', () => {
      const test = new Country();

      unit
        .given(test.name = undefined)
        .undefined(test.name);
    }); // end it

    it('should accept null as undefined', () => {
      const test = new Country();

      unit
        .given(test.name = null)
        .undefined(test.name);
    }); // end it

    it('should accept a string', () => {
      const test = new Country();

      unit
        .given(test.name = 'some name')
        .string(test.name);
    }); // end it

    it('should accept stringifiable array', () => {
      const test = new Country();

      unit
        .given(test.name = ['united', ' ', 'states'])
        .string(test.name)
        .is('united, ,states')
        .given(test.name = ['a'])
        .string(test.name)
        .is('a')
        .given(test.name = ['a', 'b', 'c'])
        .string(test.name)
        .is('a,b,c');
    }); // end it

    it('should accept stringifiable objects', () => {
      const test = new Country();

      unit
        .given(test.name = 123)
        .string(test.name)
        .given(test.name = new Date())
        .string(test.name)
        .given(test.name = /a/i)
        .string(test.name);
    }); // end it

    it('should throw and Error for non stringifiable objects', () => {
      const test = new Country();

      unit
        .error(() => {
          test.name = {
            toString: false,
            nope: true,
          };
        });
    }); // end it
  }); // end describe #name

  // describe #iso2Code
  describe('#iso2Code', () => {
    it('should accept undefined', () => {
      const test = new Country();

      unit
        .given(test.iso2Code = undefined)
        .undefined(test.iso2Code);
    }); // end it

    it('should accept null as undefined', () => {
      const test = new Country();

      unit
        .given(test.iso2Code = null)
        .undefined(test.iso2Code);
    }); // end it

    it('should accept a 2 char string', () => {
      const test = new Country();

      unit
        .given(test.iso2Code = 'aa')
        .string(test.iso2Code)
        .is('AA')
        .given(test.iso2Code = 'US')
        .string(test.iso2Code)
        .is('US');
    }); // end it

    it('should accept stringifiable array', () => {
      const test = new Country();

      unit
        .given(test.iso2Code = ['us'])
        .string(test.iso2Code)
        .is('US')
        .given(test.iso2Code = ['aa'])
        .string(test.iso2Code)
        .is('AA')
        .given(test.iso2Code = ['gb'])
        .string(test.iso2Code)
        .is('GB');
    }); // end it

    it('should throw an error for any non 2 char string', () => {
      const test = new Country();

      unit
        .error(() => {
          test.iso2Code = 'asd';
        })
        .error(() => {
          test.iso2Code = 'a';
        });
    }); // end it

    it('should throw an error for any non alpha 2 char strings', () => {
      const test = new Country();

      unit
        .error(() => {
          test.iso2Code = 123;
        })
        .error(() => {
          test.iso2Code = 12;
        })
        .error(() => {
          test.iso2Code = 'a3';
        });
    }); // end it
  }); // end describe #iso2Code

  // describe #iso3Code
  describe('#iso3Code', () => {
    it('should accept undefined', () => {
      const test = new Country();

      unit
        .given(test.iso3Code = undefined)
        .undefined(test.iso3Code);
    }); // end it

    it('should accept null as undefined', () => {
      const test = new Country();

      unit
        .given(test.iso3Code = null)
        .undefined(test.iso3Code);
    }); // end it

    it('should accept a 2 char string', () => {
      const test = new Country();

      unit
        .given(test.iso3Code = 'aaa')
        .string(test.iso3Code)
        .is('AAA')
        .given(test.iso3Code = 'USa')
        .string(test.iso3Code)
        .is('USA');
    }); // end it

    it('should accept stringifiable array', () => {
      const test = new Country();

      unit
        .given(test.iso3Code = ['usa'])
        .string(test.iso3Code)
        .is('USA')
        .given(test.iso3Code = ['aaa'])
        .string(test.iso3Code)
        .is('AAA')
        .given(test.iso3Code = ['gbr'])
        .string(test.iso3Code)
        .is('GBR');
    }); // end it

    it('should throw an error for any non 3 char string', () => {
      const test = new Country();

      unit
        .error(() => {
          test.iso3Code = 'a';
        })
        .error(() => {
          test.iso3Code = 'as';
        })
        .error(() => {
          test.iso3Code = 'aabb';
        });
    }); // end it

    it('should throw an error for any non alpha 3 char strings', () => {
      const test = new Country();

      unit
        .error(() => {
          test.iso3Code = 123;
        })
        .error(() => {
          test.iso3Code = 12;
        })
        .error(() => {
          test.iso3Code = 'a3';
        });
    }); // end it
  }); // end describe #iso3Code

  // describe #isoNumericCode
  describe('#isoNumericCode', () => {
    it('should accept undefined', () => {
      const test = new Country();

      unit
        .given(test.isoNumericCode = undefined)
        .undefined(test.isoNumericCode);
    }); // end it

    it('should accept null as undefined', () => {
      const test = new Country();

      unit
        .given(test.isoNumericCode = null)
        .undefined(test.isoNumericCode);
    }); // end it

    it('should accept a 3 char numeric string', () => {
      const test = new Country();

      unit
        .given(test.isoNumericCode = '045')
        .string(test.isoNumericCode)
        .is('045')
        .given(test.isoNumericCode = '372')
        .string(test.isoNumericCode)
        .is('372');
    }); // end it

    it('should accept stringifiable array', () => {
      const test = new Country();

      unit
        .given(test.isoNumericCode = ['563'])
        .string(test.isoNumericCode)
        .is('563')
        .given(test.isoNumericCode = ['111'])
        .string(test.isoNumericCode)
        .is('111')
        .given(test.isoNumericCode = ['825'])
        .string(test.isoNumericCode)
        .is('825');
    }); // end it

    it('should accept stringifiable objects', () => {
      const test = new Country();

      unit
        .given(test.isoNumericCode = 123)
        .string(test.isoNumericCode);
    }); // end it

    it('should throw an error for any non numeric 3 char string', () => {
      const test = new Country();

      unit
        .error(() => {
          test.isoNumericCode = 'a';
        })
        .error(() => {
          test.isoNumericCode = 'as';
        })
        .error(() => {
          test.isoNumericCode = 'aabb';
        })
        .error(() => {
          test.isoNumericCode = 1;
        })
        .error(() => {
          test.isoNumericCode = 12;
        })
        .error(() => {
          test.isoNumericCode = 'a3';
        });
    }); // end it
  }); // end describe #isoNumericCode

  // describe #postalCodeRegEx
  describe('#postalCodeRegEx', () => {
    it('should accept undefined', () => {
      const test = new Country();

      unit
        .given(test.postalCodeRegEx = undefined)
        .undefined(test.postalCodeRegEx);
    }); // end it

    it('should accept null', () => {
      const test = new Country();

      unit
        .given(test.postalCodeRegEx = null)
        .value(test.postalCodeRegEx)
        .isNull();
    }); // end it

    it('should accept a regular expression', () => {
      const test = new Country();

      unit
        .given(test.postalCodeRegEx = /^a34$/)
        .regexp(test.postalCodeRegEx)
        .given(test.postalCodeRegEx = new RegExp('555')) // eslint-disable-line prefer-regex-literals
        .regexp(test.postalCodeRegEx);
    }); // end it

    it('should throw an error for strings', () => {
      const test = new Country();

      unit
        .error(() => {
          test.postalCodeRegEx = 'hi';
        })
        .error(() => {
          test.postalCodeRegEx = 'dsfkjh';
        })
        .error(() => {
          test.postalCodeRegEx = '/555/';
        })
        .error(() => {
          test.postalCodeRegEx = '^5$';
        });
    }); // end it

    it('should throw an error for numbers', () => {
      const test = new Country();

      unit
        .error(() => {
          test.postalCodeRegEx = 5;
        })
        .error(() => {
          test.postalCodeRegEx = 3.4;
        })
        .error(() => {
          test.postalCodeRegEx = -1;
        })
        .error(() => {
          test.postalCodeRegEx = -435.67;
        });
    }); // end it

    it('should throw an error for arrays', () => {
      const test = new Country();

      unit
        .error(() => {
          test.postalCodeRegEx = [/34/, '45', 76];
        })
        .error(() => {
          test.postalCodeRegEx = [/34/];
        })
        .error(() => {
          test.postalCodeRegEx = ['45'];
        })
        .error(() => {
          test.postalCodeRegEx = [76];
        });
    }); // end it

    it('should throw an error for objects', () => {
      const test = new Country();

      unit
        .error(() => {
          test.postalCodeRegEx = {
            a: '5',
            b: /45/,
            c: [56, 78],
            d: 5.5,
            e: 3,
          };
        })
        .error(() => {
          test.postalCodeRegEx = {
            a: /45/,
          };
        })
        .error(() => {
          test.postalCodeRegEx = {
            a: 'hi',
          };
        })
        .error(() => {
          test.postalCodeRegEx = {
            a: [5, 7],
          };
        })
        .error(() => {
          test.postalCodeRegEx = {
            a: 5.5,
          };
        })
        .error(() => {
          test.postalCodeRegEx = {
            a: 4,
          };
        });
    }); // end it
  }); // end describe #postalCodeRegEx

  // describe #callingCode
  describe('#callingCode', () => {
    it('should accept undefined', () => {
      const test = new Country();

      unit
        .given(test.callingCode = undefined)
        .undefined(test.callingCode);
    }); // end it

    it('should accept null', () => {
      const test = new Country();

      unit
        .given(test.callingCode = null)
        .value(test.callingCode)
        .isNull();
    }); // end it

    it('should accept numeric string', () => {
      const test = new Country();

      unit
        .given(test.callingCode = '1')
        .array(test.callingCode)
        .is(['+1']);
    }); // end it

    it('should accept an integer', () => {
      const test = new Country();

      unit
        .given(test.callingCode = 35)
        .array(test.callingCode)
        .is(['+35']);
    }); // end it

    it('should accept an array of numberic strings and/or integers', () => {
      const test = new Country();

      unit
        .given(test.callingCode = ['1', '34', '8'])
        .array(test.callingCode)
        .is(['+1', '+34', '+8'])
        .given(test.callingCode = [1, 45, 78])
        .array(test.callingCode)
        .is(['+1', '+45', '+78'])
        .given(test.callingCode = ['1', 33, '56'])
        .array(test.callingCode)
        .is(['+1', '+33', '+56']);
    }); // end it

    it('should throw an error for non numberic strings', () => {
      const test = new Country();

      unit
        .error(() => {
          test.callingCode = 'asd';
        })
        .error(() => {
          test.callingCode = '5648fb';
        })
        .error(() => {
          test.callingCode = 'f746389';
        })
        .error(() => {
          test.callingCode = '#$$^';
        })
        .error(() => {
          test.callingCode = '$32486';
        });
    }); // end it

    it('should throw an error for floats', () => {
      const test = new Country();

      unit
        .error(() => {
          test.callingCode = 6.5;
        })
        .error(() => {
          test.callingCode = -45.6;
        })
        .error(() => {
          test.callingCode = 0.6;
        })
        .error(() => {
          test.callingCode = -0.4;
        });
    }); // end it

    it('should throw an error for negative numbers', () => {
      const test = new Country();

      unit
        .error(() => {
          test.callingCode = -1;
        })
        .error(() => {
          test.callingCode = -5;
        })
        .error(() => {
          test.callingCode = -56;
        });
    }); // end it

    it('should throw an error for an array containting non numberic values', () => {
      const test = new Country();

      unit
        .error(() => {
          test.callingCode = ['45', 't'];
        })
        .error(() => {
          test.callingCode = [34, 7.7];
        })
        .error(() => {
          test.callingCode = ['t'];
        })
        .error(() => {
          test.callingCode = [{}, '5'];
        });
    }); // end it
  }); // end describe #callingCode

  // describe #hasCallingCode
  describe('#hasCallingCode', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.hasCallingCode);
    }); // end it

    it('should return true for calling codes already in the array', () => {
      const test = new Country();

      unit
        .given(test.callingCode = [1, 45, '87', '6 7'])
        .bool(test.hasCallingCode('1'))
        .isTrue()
        .bool(test.hasCallingCode('+45'))
        .isTrue()
        .bool(test.hasCallingCode(87))
        .isTrue()
        .bool(test.hasCallingCode('+6 7'))
        .isTrue();
    }); // end it

    it('should return false for calling codes not in the array', () => {
      const test = new Country();

      unit
        .given(test.callingCode = 1)
        .bool(test.hasCallingCode(5))
        .isFalse()
        .bool(test.hasCallingCode('+9'))
        .isFalse()
        .bool(test.hasCallingCode('6 7'))
        .isFalse();
    }); // end it
  }); // end describe #hasCallingCode

  // describe #hasAnyCallingCodes
  describe('#hasAnyCallingCodes', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.hasAnyCallingCodes);
    }); // end it

    it('should return true if any calling code exists in the array', () => {
      const test = new Country();

      unit
        .given(test.callingCode = [1, 45, '87', '6 7'])
        .bool(test.hasAnyCallingCodes(3, '1'))
        .isTrue()
        .bool(test.hasAnyCallingCodes(7, '+45'))
        .isTrue()
        .bool(test.hasAnyCallingCodes(10, 87))
        .isTrue()
        .bool(test.hasAnyCallingCodes(6, '+6 7'))
        .isTrue();
    }); // end it

    it('should return false if no calling code exists in the array', () => {
      const test = new Country();

      unit
        .given(test.callingCode = 1)
        .bool(test.hasAnyCallingCodes(2, 3, 4, 5, 6, 7, 8, 9, 10))
        .isFalse()
        .bool(test.hasAnyCallingCodes(23, '+9'))
        .isFalse()
        .bool(test.hasAnyCallingCodes(11, '6 7'))
        .isFalse();
    }); // end it
  }); // end describe #hasAnyCallingCodes

  // describe #hasAllCallingCodes
  describe('#hasAllCallingCodes', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.hasAllCallingCodes);
    }); // end it

    it('should return true if all calling codes exists in the array', () => {
      const test = new Country();

      unit
        .given(test.callingCode = [1, 45, '87', '6 7'])
        .bool(test.hasAllCallingCodes(45, '1'))
        .isTrue()
        .bool(test.hasAllCallingCodes(87, '+45'))
        .isTrue()
        .bool(test.hasAllCallingCodes('6 7', 87))
        .isTrue()
        .bool(test.hasAllCallingCodes(1, '+6 7'))
        .isTrue();
    }); // end it

    it('should return false if any calling code does not exists in the array', () => {
      const test = new Country();

      unit
        .given(test.callingCode = 1)
        .bool(test.hasAllCallingCodes(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
        .isFalse()
        .bool(test.hasAllCallingCodes(1, 23, '+9'))
        .isFalse()
        .bool(test.hasAllCallingCodes(1, 11, '6 7'))
        .isFalse();
    }); // end it
  }); // end describe #hasAllCallingCodes

  // describe #addCallingCode
  describe('#addCallingCode', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.addCallingCode);
    }); // end it

    it('should add a calling code to the array', () => {
      const test = new Country();

      unit
        .given(test.addCallingCode('5'))
        .array(test.callingCode)
        .is(['+5'])
        .given(test.addCallingCode('6 7'))
        .array(test.callingCode)
        .is(['+5', '+6 7'])
        .given(test.addCallingCode(82))
        .array(test.callingCode)
        .is(['+5', '+6 7', '+82']);
    }); // end it
  }); // end describe #addCallingCode

  // describe #removeCallingCode
  describe('#removeCallingCode', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.removeCallingCode);
    }); // end it

    it('should remove a calling code from the array', () => {
      const test = new Country();

      unit
        .given(test.callingCode = [1, 45, '+6 7'])
        .given(test.removeCallingCode(1))
        .array(test.callingCode)
        .is(['+45', '+6 7'])
        .given(test.removeCallingCode('6 7'))
        .array(test.callingCode)
        .is(['+45'])
        .given(test.removeCallingCode('45'))
        .undefined(test.callingCode);
    }); // end it
  }); // end describe #removeCallingCode

  // describe #set
  describe('#set', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.set);
    }); // end it

    it('should accept an obejct literal and set the properties defined', () => {
      const test = new Country();
      const opt = {
        name: 'test',
        iso2Code: 'TT',
        postalCodeRegEx: /^a$/i,
      };

      unit
        .given(test.set(opt))
        .object(test)
        .hasProperty('name', opt.name)
        .hasProperty('iso2Code', opt.iso2Code)
        .hasProperty('postalCodeRegEx', opt.postalCodeRegEx);
    }); // end it
  }); // end describe #set

  // describe #get
  describe('#get', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.get);
    }); // end it

    it('should return an object literal with the provided properties', () => {
      const test = new Country();

      unit
        .given(test.name = 'fake')
        .object(test.get('name'))
        .hasLength(1)
        .hasProperty('name', 'fake')
        .given(test.iso2Code = 'AA')
        .object(test.get('name', 'iso2Code'))
        .hasLength(2)
        .hasProperty('name', 'fake')
        .hasProperty('iso2Code', 'AA')
        .given(test.iso3Code = 'AAA')
        .object(test.get(['name', 'iso2Code', 'iso3Code']))
        .hasLength(3)
        .hasProperty('name', 'fake')
        .hasProperty('iso2Code', 'AA')
        .hasProperty('iso3Code', 'AAA')
        .object(test.get('name', ['iso2Code', 'iso3Code']))
        .hasLength(3)
        .hasProperty('name', 'fake')
        .hasProperty('iso2Code', 'AA')
        .hasProperty('iso3Code', 'AAA')
        .object(test.get('nonExist', 'name', 'postalCode'))
        .hasLength(1)
        .hasProperty('name', 'fake');
    }); // end it
  }); // end describe '#get'

  // describe #isValidPostalCode
  describe('#isValidPostalCode', () => {
    it('should be a function', () => {
      const test = new Country();

      unit
        .function(test.isValidPostalCode);
    }); // end it

    it('should return true for postal codes that pass the postal code RegExp', () => {
      const test = Country.getByIso2Code('US');

      unit
        .bool(test.isValidPostalCode('12345'))
        .isTrue()
        .bool(test.isValidPostalCode('12345-1234'))
        .isTrue()
        .bool(test.isValidPostalCode('12345 1234'))
        .isTrue()
        .bool(test.isValidPostalCode('123456789'))
        .isTrue();
    }); // end it

    it('should return false for postal codes that do not pass the postal code RegExp', () => {
      const test = Country.getByIso2Code('US');

      unit
        .bool(test.isValidPostalCode('1'))
        .isFalse()
        .bool(test.isValidPostalCode('1234'))
        .isFalse()
        .bool(test.isValidPostalCode('123456'))
        .isFalse()
        .bool(test.isValidPostalCode('1234567890'))
        .isFalse()
        .bool(test.isValidPostalCode('   '))
        .isFalse()
        .bool(test.isValidPostalCode())
        .isFalse()
        .bool(test.isValidPostalCode('1234t'))
        .isFalse();
    }); // end it
  }); // end describe '#isValidPostalCode'

  // describe #[Symbol.toStringTag]
  describe('#[Symbol.toStringTag]', () => {
    it('should return "@scuba-squad/country"', () => {
      const test = new Country();

      unit
        .string(test[Symbol.toStringTag])
        .is('@scuba-squad/country');
    }); // end it

    it('should return "[object @scuba-squad/country]" for Object.prototype.toString.call', () => {
      const test = new Country();

      unit
        .string(Object.prototype.toString.call(test))
        .is('[object @scuba-squad/country]');
    }); // end it
  }); // end describe #[Symbol.toStringTag]
}); // end describe Country