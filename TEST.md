# TOC
   - [Country](#country)
     - [#VERSION](#country-version)
     - [#getByIso2Code](#country-getbyiso2code)
     - [#getByIso3Code](#country-getbyiso3code)
     - [#getByIsoNumericCode](#country-getbyisonumericcode)
     - [#getByPostalCode](#country-getbypostalcode)
     - [#getByCallingCode](#country-getbycallingcode)
     - [#name](#country-name)
     - [#iso2Code](#country-iso2code)
     - [#iso3Code](#country-iso3code)
     - [#isoNumericCode](#country-isonumericcode)
     - [#postalCodeRegEx](#country-postalcoderegex)
     - [#callingCode](#country-callingcode)
     - [#hasCallingCode](#country-hascallingcode)
     - [#hasAnyCallingCodes](#country-hasanycallingcodes)
     - [#hasAllCallingCodes](#country-hasallcallingcodes)
     - [#addCallingCode](#country-addcallingcode)
     - [#removeCallingCode](#country-removecallingcode)
     - [#set](#country-set)
     - [#get](#country-get)
     - [#isValidPostalCode](#country-isvalidpostalcode)
     - [#[Symbol.toStringTag]](#country-symboltostringtag)
   - [countries](#countries)
<a name=""></a>
 
<a name="country"></a>
# Country
should be a function.

```js
unit
  .function(Country);
```

should return an instance of Country.

```js
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
```

<a name="country-version"></a>
## #VERSION
should be a constant property.

```js
const test = new Country();
unit
  .string(test.VERSION)
  .is(version);
```

<a name="country-getbyiso2code"></a>
## #getByIso2Code
should be a static function.

```js
unit
  .function(Country.getByIso2Code);
```

should return an instance of Country for known iso code.

```js
unit
  .object(Country.getByIso2Code('US'))
  .isInstanceOf(Country);
```

should return false for unknown iso code.

```js
unit
  .bool(Country.getByIso2Code('AA'))
  .isFalse();
```

<a name="country-getbyiso3code"></a>
## #getByIso3Code
should be a static function.

```js
unit
  .function(Country.getByIso3Code);
```

should return an instance of Country for known iso code.

```js
unit
  .object(Country.getByIso3Code('USA'))
  .isInstanceOf(Country);
```

should return false for unknown iso code.

```js
unit
  .bool(Country.getByIso3Code('AAA'))
  .isFalse();
```

<a name="country-getbyisonumericcode"></a>
## #getByIsoNumericCode
should be a static function.

```js
unit
  .function(Country.getByIsoNumericCode);
```

should return an instance of Country for known iso code.

```js
unit
  .object(Country.getByIsoNumericCode('004'))
  .isInstanceOf(Country);
```

should return false for unknown iso code.

```js
unit
  .bool(Country.getByIsoNumericCode('000'))
  .isFalse();
```

<a name="country-getbypostalcode"></a>
## #getByPostalCode
should be a static function.

```js
unit
  .function(Country.getByPostalCode);
```

should return an array of Country objects who match the given postal code.

```js
const postalCode = '55555';
unit
  .array(Country.getByPostalCode(postalCode))
  .isNotEmpty()
  .matchEach((value) => {
    return value.isValidPostalCode(postalCode);
  });
```

should return an array of Country objects with no postal code when given null.

```js
unit
  .array(Country.getByPostalCode())
  .isNotEmpty()
  .matchEach((value) => {
    return !value.postalCodeRegEx;
  });
```

should return false for no known Country with a matching postal code.

```js
unit
  .bool(Country.getByPostalCode('A'))
  .isFalse();
```

<a name="country-getbycallingcode"></a>
## #getByCallingCode
should be a static function.

```js
unit
  .function(Country.getByCallingCode);
```

should return an array of country objects who match the given calling code.

```js
const callingCode = '1';
unit
  .array(Country.getByCallingCode(callingCode))
  .isNotEmpty()
  .matchEach((value) => {
    return value.hasCallingCode(callingCode);
  });
```

should return false for no known Country with a matching calling code.

```js
unit
  .bool(Country.getByCallingCode('123445'))
  .isFalse();
```

<a name="country-name"></a>
## #name
should accept undefined.

```js
const test = new Country();
unit
  .given(test.name = undefined)
  .undefined(test.name);
```

should accept null as undefined.

```js
const test = new Country();
unit
  .given(test.name = null)
  .undefined(test.name);
```

should accept a string.

```js
const test = new Country();
unit
  .given(test.name = 'some name')
  .string(test.name);
```

should accept stringifiable array.

```js
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
```

should accept stringifiable objects.

```js
const test = new Country();
unit
  .given(test.name = 123)
  .string(test.name)
  .given(test.name = new Date())
  .string(test.name)
  .given(test.name = /a/iu)
  .string(test.name);
```

should throw and Error for non stringifiable objects.

```js
const test = new Country();
unit
  .error(() => {
    test.name = {
      nope: true,
      toString: false,
    };
  });
```

<a name="country-iso2code"></a>
## #iso2Code
should accept undefined.

```js
const test = new Country();
unit
  .given(test.iso2Code = undefined)
  .undefined(test.iso2Code);
```

should accept null as undefined.

```js
const test = new Country();
unit
  .given(test.iso2Code = null)
  .undefined(test.iso2Code);
```

should accept a 2 char string.

```js
const test = new Country();
unit
  .given(test.iso2Code = 'aa')
  .string(test.iso2Code)
  .is('AA')
  .given(test.iso2Code = 'US')
  .string(test.iso2Code)
  .is('US');
```

should accept stringifiable array.

```js
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
```

should throw an error for any non 2 char string.

```js
const test = new Country();
unit
  .error(() => {
    test.iso2Code = 'asd';
  })
  .error(() => {
    test.iso2Code = 'a';
  });
```

should throw an error for any non alpha 2 char strings.

```js
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
```

<a name="country-iso3code"></a>
## #iso3Code
should accept undefined.

```js
const test = new Country();
unit
  .given(test.iso3Code = undefined)
  .undefined(test.iso3Code);
```

should accept null as undefined.

```js
const test = new Country();
unit
  .given(test.iso3Code = null)
  .undefined(test.iso3Code);
```

should accept a 2 char string.

```js
const test = new Country();
unit
  .given(test.iso3Code = 'aaa')
  .string(test.iso3Code)
  .is('AAA')
  .given(test.iso3Code = 'USa')
  .string(test.iso3Code)
  .is('USA');
```

should accept stringifiable array.

```js
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
```

should throw an error for any non 3 char string.

```js
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
```

should throw an error for any non alpha 3 char strings.

```js
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
```

<a name="country-isonumericcode"></a>
## #isoNumericCode
should accept undefined.

```js
const test = new Country();
unit
  .given(test.isoNumericCode = undefined)
  .undefined(test.isoNumericCode);
```

should accept null as undefined.

```js
const test = new Country();
unit
  .given(test.isoNumericCode = null)
  .undefined(test.isoNumericCode);
```

should accept a 3 char numeric string.

```js
const test = new Country();
unit
  .given(test.isoNumericCode = '045')
  .string(test.isoNumericCode)
  .is('045')
  .given(test.isoNumericCode = '372')
  .string(test.isoNumericCode)
  .is('372');
```

should accept stringifiable array.

```js
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
```

should accept stringifiable objects.

```js
const test = new Country();
unit
  .given(test.isoNumericCode = 123)
  .string(test.isoNumericCode);
```

should throw an error for any non numeric 3 char string.

```js
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
```

<a name="country-postalcoderegex"></a>
## #postalCodeRegEx
should accept undefined.

```js
const test = new Country();
unit
  .given(test.postalCodeRegEx = undefined)
  .undefined(test.postalCodeRegEx);
```

should accept null.

```js
const test = new Country();
unit
  .given(test.postalCodeRegEx = null)
  .value(test.postalCodeRegEx)
  .isNull();
```

should accept a regular expression.

```js
const test = new Country();
unit
  .given(test.postalCodeRegEx = /^a34$/u)
  .regexp(test.postalCodeRegEx)
  .given(test.postalCodeRegEx = new RegExp('555', 'u')) // eslint-disable-line prefer-regex-literals
  .regexp(test.postalCodeRegEx);
```

should throw an error for strings.

```js
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
```

should throw an error for numbers.

```js
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
```

should throw an error for arrays.

```js
const test = new Country();
unit
  .error(() => {
    test.postalCodeRegEx = [/34/u, '45', 76];
  })
  .error(() => {
    test.postalCodeRegEx = [/34/u];
  })
  .error(() => {
    test.postalCodeRegEx = ['45'];
  })
  .error(() => {
    test.postalCodeRegEx = [76];
  });
```

should throw an error for objects.

```js
const test = new Country();
unit
  .error(() => {
    test.postalCodeRegEx = {
      a: '5',
      b: /45/u,
      c: [56, 78],
      d: 5.5,
      e: 3,
    };
  })
  .error(() => {
    test.postalCodeRegEx = {
      a: /45/u,
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
```

<a name="country-callingcode"></a>
## #callingCode
should accept undefined.

```js
const test = new Country();
unit
  .given(test.callingCode = undefined)
  .undefined(test.callingCode);
```

should accept null.

```js
const test = new Country();
unit
  .given(test.callingCode = null)
  .value(test.callingCode)
  .isNull();
```

should accept numeric string.

```js
const test = new Country();
unit
  .given(test.callingCode = '1')
  .array(test.callingCode)
  .is(['+1']);
```

should accept an integer.

```js
const test = new Country();
unit
  .given(test.callingCode = 35)
  .array(test.callingCode)
  .is(['+35']);
```

should accept an array of numberic strings and/or integers.

```js
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
```

should throw an error for non numberic strings.

```js
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
```

should throw an error for floats.

```js
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
```

should throw an error for negative numbers.

```js
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
```

should throw an error for an array containting non numberic values.

```js
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
```

<a name="country-hascallingcode"></a>
## #hasCallingCode
should be a function.

```js
const test = new Country();
unit
  .function(test.hasCallingCode);
```

should return true for null|undefined when callingCode is not set.

```js
const test = new Country();
unit
  .bool(test.hasCallingCode())
  .isTrue()
  .bool(test.hasCallingCode(undefined))
  .isTrue()
  .bool(test.hasCallingCode(null))
  .isTrue();
```

should return true for calling codes already in the array.

```js
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
```

should return false for calling codes not in the array.

```js
const test = new Country();
unit
  .given(test.callingCode = 1)
  .bool(test.hasCallingCode(5))
  .isFalse()
  .bool(test.hasCallingCode('+9'))
  .isFalse()
  .bool(test.hasCallingCode('6 7'))
  .isFalse();
```

<a name="country-hasanycallingcodes"></a>
## #hasAnyCallingCodes
should be a function.

```js
const test = new Country();
unit
  .function(test.hasAnyCallingCodes);
```

should return true if any calling code exists in the array.

```js
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
```

should return false if no calling code exists in the array.

```js
const test = new Country();
unit
  .given(test.callingCode = 1)
  .bool(test.hasAnyCallingCodes(2, 3, 4, 5, 6, 7, 8, 9, 10))
  .isFalse()
  .bool(test.hasAnyCallingCodes(23, '+9'))
  .isFalse()
  .bool(test.hasAnyCallingCodes(11, '6 7'))
  .isFalse();
```

<a name="country-hasallcallingcodes"></a>
## #hasAllCallingCodes
should be a function.

```js
const test = new Country();
unit
  .function(test.hasAllCallingCodes);
```

should return true if all calling codes exists in the array.

```js
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
```

should return false if any calling code does not exists in the array.

```js
const test = new Country();
unit
  .given(test.callingCode = 1)
  .bool(test.hasAllCallingCodes(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))
  .isFalse()
  .bool(test.hasAllCallingCodes(1, 23, '+9'))
  .isFalse()
  .bool(test.hasAllCallingCodes(1, 11, '6 7'))
  .isFalse();
```

<a name="country-addcallingcode"></a>
## #addCallingCode
should be a function.

```js
const test = new Country();
unit
  .function(test.addCallingCode);
```

should add a calling code to the array.

```js
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
```

<a name="country-removecallingcode"></a>
## #removeCallingCode
should be a function.

```js
const test = new Country();
unit
  .function(test.removeCallingCode);
```

should remove a calling code from the array.

```js
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
```

<a name="country-set"></a>
## #set
should be a function.

```js
const test = new Country();
unit
  .function(test.set);
```

should accept an obejct literal and set the properties defined.

```js
const test = new Country();
const opt = {
  iso2Code: 'TT',
  name: 'test',
  postalCodeRegEx: /^a$/iu,
};
unit
  .given(test.set(opt))
  .object(test)
  .hasProperty('name', opt.name)
  .hasProperty('iso2Code', opt.iso2Code)
  .hasProperty('postalCodeRegEx', opt.postalCodeRegEx);
```

<a name="country-get"></a>
## #get
should be a function.

```js
const test = new Country();
unit
  .function(test.get);
```

should return an object literal with the provided properties.

```js
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
```

<a name="country-isvalidpostalcode"></a>
## #isValidPostalCode
should be a function.

```js
const test = new Country();
unit
  .function(test.isValidPostalCode);
```

should return true for postal codes that pass the postal code RegExp.

```js
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
```

should return false for postal codes that do not pass the postal code RegExp.

```js
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
```

<a name="country-symboltostringtag"></a>
## #[Symbol.toStringTag]
should return "@scuba-squad/country".

```js
const test = new Country();
unit
  .string(test[Symbol.toStringTag])
  .is('@scuba-squad/country');
```

should return "[object @scuba-squad/country]" for Object.prototype.toString.call.

```js
const test = new Country();
unit
  .string(Object.prototype.toString.call(test))
  .is('[object @scuba-squad/country]');
```

<a name="countries"></a>
# countries
should be an array of object literals.

```js
unit
  .array(countries)
  .hasLength(249)
  .matchEach((v) => {
    return !!(v.name && v.iso2Code && v.iso3Code && v.isoNumericCode);
  });
```

