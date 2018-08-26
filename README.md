# Country

<a name="status"></a>
## Status
[![Build Status](https://travis-ci.org/scub45t3v3/Country.svg?branch=master)](https://travis-ci.org/scub45t3v3/Country)
[![Coverage Status](https://coveralls.io/repos/github/scub45t3v3/Country/badge.svg)](https://coveralls.io/github/scub45t3v3/Country)

<a name="toc"></a>
## Table of Content
  * [Status](#status)
  * [Purpose](#purpose)
  * [Installation](#installation)
  * [API](#api)
  * [Test](#test)
  * [License](#license)

<a name="purpose"></a>
## Purpose
Country class definition

<a name="installation"></a>
## Installation
Via [npm](https://www.npmjs.com/)

```bash
npm install @scuba-squad/country
```

<a name="api"></a>
## API
### `Country.getByIso2Code(code: string): Country | false`
**Added in:** v1.0.0

Static method to retrieve and build a Country object from the iso2Code

**arguments:**
1. `code: string`

**returns:** Country | false

```javascript
const Country = require('@scuba-squad/country');

let country = Country.getByIso2Code('US'); // Country
let nonExistant = Country.getByIso2Code('AA'); // false
```

### `Country.getByIso3Code(code: string): Country | false`
**Added in:** v1.0.0

Static method to retrieve and build a Country object from the iso3Code

**arguments:**
1. `code: string`

**returns:** Country | false

```javascript
const Country = require('@scuba-squad/country');

let country = Country.getByIso3Code('USA'); // Country
let nonExistant = Country.getByIso3Code('AAA'); // false
```

### `Country.getByIsoNumericCode(code: string): Country | false`
**Added in:** v1.0.0

Static method to retrieve and build a Country object from the isoNumericCode

**arguments:**
1. `code: string`

**returns:** Country | false

```javascript
const Country = require('@scuba-squad/country');

let country = Country.getByIsoNumericCode('840'); // Country
let nonExistant = Country.getByIsoNumericCode('000'); // false
```

### `Country.getByPostalCode(code: ?string): Country[] | false`
**Added in:** v1.0.0

Static method to retrieve and build an array of Country objects who match the given postal code

**arguments:**
1. `code: string`

**returns:** Country[] | false

```javascript
const Country = require('@scuba-squad/country');

let country = Country.getByPostalCode('11111'); // Country[]
let nonExistant = Country.getByPostalCode('this is going to return false'); // false
```

### `Country.getByCallingCode(code: ?string): Country[] | false`
**Added in:** v1.0.0

Static method to retrieve and build an array of Country objects who match the given calling code

**arguments:**
1. `code: string`

**returns:** Country[] | false

```javascript
const Country = require('@scuba-squad/country');

let country = Country.getByCallingCode('1'); // Country[]
let nonExistant = Country.getByCallingCode('99999999999999'); // false
```

### `Country(properties: {name: ?string, iso2Code: ?string, iso3Code: ?string, isoNumericCode: ?string postalCodeRegEx: ?regexp, callingCode: ?string | string[]} = {}): Country`
**Added in:** v1.0.0

Country class constructor

**arguments:**
1. `properties: object = {}`
    - `name: string | null | undefined`
    - `iso2Code: string | null | undefined`
    - `iso3Code: string | null | undefined`
    - `isoNumericCode: string | null | undefined`
    - `postalCodeRegEx: regexp | null | undefined`
    - `callingCode: string | string[] | null | undefined`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
```
alternatively
* you can create an instance without the new keyword
```javascript
const Country = require('@scuba-squad/country');

let country = Country();
```

#### `Country.VERSION: string`
**Added in:** v1.0.0

Semantic version number of class definition

**returns:** string

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
country.VERSION; // 1.0.0
```

#### `Country.name: string | undefined`
**Added in:** v1.0.0

Property containing the name of the country

**returns:** string | undefined

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set name via setName()
country.name = 'Petoria';
// get name via getName()
country.name; // 'Petoria'
```

#### `Country.getName(): string | undefined`
**Added in:** v1.0.0

Getter method for name property

**returns:** string | undefined

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set name via setName()
country.name = 'Petoria';
// get name via getName()
country.getName(); // 'Petoria'
```

#### `Country.setName(name: ?string): Country`
**Added in:** v1.0.0

Setter method for name property

**arguments:**
1. `name: string | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set name via setName()
country.setName('Petoria');
// get name via getName()
country.name; // 'Petoria'
```

#### `Country.iso2Code: string | undefined`
**Added in:** v1.0.0

Property containing the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) [alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the country

**returns:** string | undefined

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set iso2Code via setIso2Code()
country.iso2Code = 'FG';
// get iso2Code via getIso2Code()
country.iso2Code; // 'FG'
```

#### `Country.getIso2Code(): string | undefined`
**Added in:** v1.0.0

Getter method for iso2Code property

**returns:** string | undefined

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set iso2Code via setIso2Code()
country.iso2Code = 'FG';
// get iso2Code via getIso2Code()
country.getIso2Code(); // 'FG'
```

#### `Country.setIso2Code(code: ?string): Country`
**Added in:** v1.0.

Setter method for iso2Code property

**arguments:**
1. `code: string | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set iso2Code via setIso2Code()
country.setIso2Code('FG');
// get iso2Code via getIso2Code()
country.iso2Code; // 'FG'
```

#### `Country.iso3Code: string | undefined`
**Added in:** v1.0.0

Property containing the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) [alpha-3 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) of the country

**returns:** string | undefined

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set iso3Code via setIso3Code()
country.iso3Code = 'GUY';
// get iso3Code via getIso3Code()
country.iso3Code; // 'GUY'
```

#### `Country.getIso3Code(): string | undefined`
**Added in:** v1.0.0

Getter method for iso3Code property

**returns:** string | undefined

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set iso3Code via setIso3Code()
country.iso3Code = 'GUY';
// get iso3Code via getIso3Code()
country.getIso3Code(); // 'GUY'
```

#### `Country.setIso3Code(code: ?string): Country`
**Added in:** v1.0.0

Setter method for iso3Code property

**arguments:**
1. `code: string | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set iso3Code via setIso3Code()
country.setIso3Code('GUY');
// get iso3Code via getIso3Code()
country.iso3Code; // 'GUY'
```

#### `Country.isoNumericCode: string | undefined`
**Added in:** v1.0.0

Property containing the [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) [numeric code](https://en.wikipedia.org/wiki/ISO_3166-1_numeric) of the country

**returns:** string | undefined

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set isoNumericCode via setIsoNumericCode()
country.isoNumericCode = '999';
// get isoNumericCode via getIsoNumericCode()
country.isoNumericCode; // '999'
```

#### `Country.getIsoNumericCode(): string | undefined`
**Added in:** v1.0.0

Getter method for isoNumericCode property

**returns:** string | undefined

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set isoNumericCode via setIsoNumericCode()
country.isoNumericCode = '999';
// get isoNumericCode via getIsoNumericCode()
country.getIsoNumericCode(); // '999'
```

#### `Country.setIsoNumericCode(code: ?string): Country`
**Added in:** v1.0.0

Setter method for isoNumericCode property

**arguments:**
1. `code: string | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set isoNumericCode via setIsoNumericCode()
country.setIsoNumericCode('999');
// get isoNumericCode via getIsoNumericCode()
country.isoNumericCode; // '999'
```

#### `Country.postalCodeRegEx: regexp | undefined | null`
**Added in:** v1.0.0

Property containing the postal code validation regular expression for the country

**returns:** regexp | undefined | null

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set postalCodeRegEx via setPostalCodeRegEx()
country.postalCodeRegEx = /^\d{5}$/;
// get postalCodeRegEx via getPostalCodeRegEx()
country.postalCodeRegEx; // /^\d{5}$/;
```

#### `Country.getPostalCodeRegEx(): regexp | undefined | null`
**Added in:** v1.0.0

Getter method for postalCodeRegEx property

**returns:** regexp | undefined | null

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set postalCodeRegEx via setPostalCodeRegEx()
country.postalCodeRegEx = /^\d{5}$/;
// get postalCodeRegEx via getPostalCodeRegEx()
country.getPostalCodeRegEx(); // /^\d{5}$/;
```

#### `Country.setPostalCodeRegEx(regex: ?regexp): Country`
**Added in:** v1.0.0

Setter method for postalCodeRegEx property

**arguments:**
1. `code: regexp | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set postalCodeRegEx via setPostalCodeRegEx()
country.setPostalCodeRegEx(/^\d{5}$/);
// get postalCodeRegEx via getPostalCodeRegEx()
country.postalCodeRegEx; // /^\d{5}$/;
```

#### `Country.callingCode: string | string[] | undefined | null`
**Added in:** v1.0.0

Property containing the [calling code](https://en.wikipedia.org/wiki/List_of_country_calling_codes) of the country

**returns:** string | string[] | undefined | null

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// get callingCode via getCallingCode()
country.callingCode; // undefined
// set callingCode via setCallingCode()
country.callingCode = [1, 5];
// get callingCode via getCallingCode()
country.callingCode; // ['+1', '+5']
// set callingCode via setCallingCode()
country.callingCode = null;
// get callingCode via getCallingCode()
country.callingCode; // null
```

#### `Country.getCallingCode(): string[] | undefined | null`
**Added in:** v1.0.0

Getter method for callingCode property

**returns:** string[] | undefined | null

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
country.getCallingCode(); // undefined
// set callingCode via setCallingCode()
country.callingCode = [1, 5];
country.getCallingCode(); // ['+1', '+5']
// set callingCode via setCallingCode()
country.callingCode = null;
country.getCallingCode(); // null
```

#### `Country.setCallingCode(code: ?...string | string[]): Country`
**Added in:** v1.0.0

Setter method for callingCode property

**arguments:**
1. `code: ...string | string[] | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
country
  .setCallingCode(1) // ['+1']
  .setCallingCode(5, 9) // ['+5', '+9']
  .setCallingCode([6, 9]) // ['+6', '+9']
  .setCallingCode(5, [6, 9], [1], '4 5'); // ['+5', '+6' '+9', '+1', '+4 5']
```

#### `Country.addCallingCode(code: ?...string | string[]): Country`
**Added in:** v1.0.0

Method to append calling code(s) onto the callingCode property

**arguments:**
1. `code: ...string | string[] | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
country
  .addCallingCode(1) // ['+1']
  .addCallingCode(5, 9) // ['+1', '+5', '+9']
  .addCallingCode([6, 9]) // ['+1', '+5', '+9', '+6']
  .addCallingCode(5, [6, 9], [1], '4 5'); // ['+1', '+5', '+9', '+6', '+4 5']
```

#### `Country.removeCallingCode(code: ?...string | string[]): Country`
**Added in:** v1.0.0

Method to remove calling code(s) from the callingCode property

**arguments:**
1. `code: ...string | string[] | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set callingCode via setCallingCode()
country.callingCode = [1, 5, '6 7', 9];
country.removeCallingCode(1, 3); // ['+5', '+6 7', '+9']
country.removeCallingCode(1, 5, 9); // ['+6 7']
country.removeCallingCode(1, 5, '+6 7'); // undefined
```

#### `Country.hasCallingCode(code: ?string): boolean`
**Added in:** v1.0.0

Method to check if the given calling code is set for the country

**arguments:**
1. `code: string | undefined | null`

**returns:** boolean

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set callingCode via setCallingCode()
country.callingCode = [1, 5, '6 7'];
country.hasCallingCode(3); // false
country.hasCallingCode(1); // true
country.hasCallingCode('+6 7'); // true
country.hasCallingCode('+1 5'); // false
country.hasCallingCode(5); // true
```

#### `Country.hasAllCallingCodes(codes: ?...string | string[]): boolean`
**Added in:** v1.0.0

Method to check if all the given calling codes are set for the country

**arguments:**
1. `code: ...string | string[] | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set callingCode via setCallingCode()
country.callingCode = [1, 5, '6 7', 9];
country.hasAllCallingCodes(1, 3); // false
country.hasAllCallingCodes(1, 5, 9); // true
country.hasAllCallingCodes(1, 5, '+6 7'); // true
country.hasAllCallingCodes(1, 5, 3); // false
country.hasAllCallingCodes(1, 5, 9, '6 7'); // true

country.hasAllCallingCodes([1, 3]); // false
country.hasAllCallingCodes([1, 5, 9]); // true
country.hasAllCallingCodes([1, 5, '+6 7']); // true
country.hasAllCallingCodes([1, 5, 3]); // false
country.hasAllCallingCodes([1, 5, 9, '6 7']); // true

country.hasAllCallingCodes(1, [3]); // false
country.hasAllCallingCodes([1], 5, 9); // true
country.hasAllCallingCodes([1, 5], '+6 7'); // true
country.hasAllCallingCodes(1, [5, 3]); // false
country.hasAllCallingCodes(1, [5, 9], '6 7'); // true
```

#### `Country.hasAnyCallingCodes(codes: ?...string | string[]): boolean`
**Added in:** v1.0.0

Method to check if any of the given calling codes are set for the country

**arguments:**
1. `code: ...string | string[] | undefined | null`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
// set callingCode via setCallingCode()
country.callingCode = [1, 5, '6 7', 9];
country.hasAnyCallingCodes(2, 3); // false
country.hasAnyCallingCodes(2, 3, 1); // true
country.hasAnyCallingCodes(2, 3, '+1'); // true
country.hasAnyCallingCodes(2, 3, 67); // false
country.hasAnyCallingCodes(2, 3, '6 7'); // true

country.hasAnyCallingCodes([2, 3]); // false
country.hasAnyCallingCodes([2, 3, 1]); // true
country.hasAnyCallingCodes([2, 3, '+1']); // true
country.hasAnyCallingCodes([2, 3, 67]); // false
country.hasAnyCallingCodes([2, 3, '6 7']); // true

country.hasAnyCallingCodes(2, [3]); // false
country.hasAnyCallingCodes(2, 3, [1]); // true
country.hasAnyCallingCodes(2, [3, '+1']); // true
country.hasAnyCallingCodes(2, [3, 67]); // false
country.hasAnyCallingCodes([2, 3], '6 7'); // true
```

#### `Country.get(properties: ?...string | string[]): object`
**Added in:** v1.0.0

Method to create an object literal containing the set properties

**arguments:**
1. `code: ...string | string[] | undefined | null`

**returns:** object

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = Country.getByIso2Code('US');
country.get('iso3Code', 'callingCode'); // {iso3Code: 'USA', callingCode: ['+1']}
country.get(['iso3Code', 'callingCode']); // {iso3Code: 'USA', callingCode: ['+1']}
country.get('iso2Code', ['iso3Code', 'callingCode'], 'isoNumericCode'); // {iso2Code: 'US', iso3Code: 'USA', callingCode: ['+1'], isoNumericCode: '840'}
```

#### `Country.set(properties: {name: ?string, iso2Code: ?string, iso3Code: ?string, isoNumericCode: ?string postalCodeRegEx: ?regexp, callingCode: ?string | string[]} = {}): Country`
**Added in:** v1.0.0

Method to bulk set properties on the country

**arguments:**
1. `properties: object = {}`
    - `name: string | null | undefined`
    - `iso2Code: string | null | undefined`
    - `iso3Code: string | null | undefined`
    - `isoNumericCode: string | null | undefined`
    - `postalCodeRegEx: regexp | null | undefined`
    - `callingCode: string | string[] | null | undefined`

**returns:** Country

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
country.set({name: 'Petoria', iso2Code: 'FG', iso3Code: 'GUY'});
```

#### `Country.isValidPostalCode(postalCode: ?string): boolean`
**Added in:** v1.0.0

Method to check if the given postal code is valid for the country

**arguments:**
1. `code: string | undefined | null`

**returns:** boolean

**throws:** TypeError

```javascript
const Country = require('@scuba-squad/country');

// create new instance of Country without setting postalCodeRegEx
let country = new Country();
country.isValidPostalCode(); // true
country.isValidPostalCode(null); // true
country.isValidPostalCode(NaN); // false
country.isValidPostalCode(0); // false
country.isValidPostalCode(''); // false
country.isValidPostalCode([]); // false
country.isValidPostalCode({}); // false

// set postalCodeRegEx via setPostalCodeRegEx()
country.postalCodeRegEx = /^\d{5}$/;
country.isValidPostalCode('12345'); // true
country.isValidPostalCode('1234'); // false
country.isValidPostalCode('123456'); // false
country.isValidPostalCode('123e5'); // false
```

#### `Country[Symbol.toStringTag]: string`
**Added in:** v1.1.0

**returns:** string

```javascript
const Country = require('@scuba-squad/country');

let country = new Country();
country[Symbol.toStringTag]; // '@scuba-squad/country'
Object.prototype.toString.call(country); // '[object @scuba-squad/country]'
```

<a name="test"></a>
## Test
[tests](TEST.md)
```bash
npm install
npm test
```

<a name="license"></a>
## License
[MIT](LICENSE)