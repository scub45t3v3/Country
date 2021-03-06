'use strict';

// include dependecies
const _ = require('underscore');
const debug = require('debug')('Country');
const {version} = require('./package');
const countries = require('./countries');

const Country = function(opt = {}) {
  debug('call:Country(%o)', opt);
  if (!new.target) {
    return new Country(opt);
  }

  // define private properties
  let name;
  let iso2Code;
  let iso3Code;
  let isoNumericCode;
  let callingCode;
  let postalCodeRegEx;

  const setName = (value) => {
    debug('call:setName(%o)', value);
    value = value && `${value}`.trim();
    name = value || undefined;

    return this;
  }; // end setName

  const getName = () => {
    debug('call:getName()');

    return name;
  }; // end getName

  const setIso2Code = (value) => {
    debug('call:setIso2Code(%o)', value);
    value = value && `${value}`.trim().toUpperCase();

    if ((value != null) && !/^[a-z]{2}$/iu.test(value)) {
      throw new TypeError('iso2Code must be 2 char alpha string');
    }

    iso2Code = value || undefined;

    return this;
  }; // end setIso2Code

  const getIso2Code = () => {
    debug('call:getIso2Code()');

    return iso2Code;
  }; // end getIso2Code

  const setIso3Code = (value) => {
    debug('call:setIso3Code(%o)', value);
    value = value && `${value}`.trim().toUpperCase();

    if ((value != null) && !/^[a-z]{3}$/iu.test(value)) {
      throw new TypeError('iso3Code must be 3 char alpha string');
    }

    iso3Code = value || undefined;

    return this;
  }; // end setIso3Code

  const getIso3Code = () => {
    debug('call:getIso3Code()');

    return iso3Code;
  }; // end getIso3Code

  const setIsoNumericCode = (value) => {
    debug('call:setIsoNumericCode(%o)', value);
    value = value && `${value}`.trim();

    if (value != null && value != '000' && !/^\d{3}$/u.test(value)) {
      throw new TypeError('isoNumericCode must be a 3 digit string');
    }

    isoNumericCode = value || undefined;

    return this;
  }; // end setIsoNumericCode

  const getIsoNumericCode = () => {
    debug('call:getIsoNumericCode()');

    return isoNumericCode;
  }; // end getIsoNumericCode

  const setPostalCodeRegEx = (value) => {
    debug('call:setPostalCodeRegEx(%o)', value);

    if (value != null && !(value instanceof RegExp)) {
      throw new TypeError('postalCodeRegEx must be a RegExp');
    }

    postalCodeRegEx = value;

    return this;
  }; // end setPostalCodeRegEx

  const getPostalCodeRegEx = () => {
    debug('call:getPostalCodeRegEx()');

    return postalCodeRegEx;
  }; // end getPostalCodeRegEx

  const hasCallingCode = (value) => {
    debug('call:hasCallingCode(%o)', value);
    value = _.first(sanitizeCallingCode(value));

    return (value == null && callingCode == null)
      || _.contains(callingCode, value);
  }; // end hasCallingCode

  const hasAnyCallingCodes = (...args) => {
    debug('call:hasAnyCallingCodes(%o)', args);
    args = sanitizeCallingCode(...args);

    return _.any(args, hasCallingCode);
  }; // end hasAnyCallingCodes

  const hasAllCallingCodes = (...args) => {
    debug('call:hasAllCallingCodes(%o)', args);
    args = sanitizeCallingCode(...args);

    return _.all(args, hasCallingCode);
  }; // end hasAllCallingCodes

  const addCallingCode = (...args) => {
    debug('call:addCallingCode(%o)', args);
    args = sanitizeCallingCode(...args);

    if (args == null) {
      callingCode = args;
    } else if (args.length) {
      callingCode = _.union(callingCode, args);
    }

    return this;
  }; // end addCallingCode

  const removeCallingCode = (...args) => {
    debug('call:removeCallingCode(%o)', args);
    args = sanitizeCallingCode(...args);
    callingCode = _.without(callingCode, ...args);

    if (!callingCode.length) {
      callingCode = undefined;
    }

    return this;
  }; // end removeCallingCode

  const setCallingCode = (...args) => {
    debug('call:setCallingCode(%o)', args);
    callingCode = undefined;

    this.addCallingCode(...args);

    return this;
  }; // end setCallingCode

  const getCallingCode = () => {
    debug('call:getCallingCode()');

    return _.clone(callingCode);
  }; // end getCallingCode

  const sanitizeCallingCode = (...args) => {
    debug('call:sanitizeCallingCode(%o)', args);
    args = _.flatten(args);

    // Check for null or undefined to set the callingCode
    if (args.length < 2 && _.first(args) == null) {
      return _.first(args);
    }

    args = _.map(args, (value) => {
      value = (value && `${value}`.trim()) || '';
      value = value
        .replace(/^\+*\s*/u, '+')
        .replace(/\s+/u, ' ');

      if (!/^\+[1-9][\s\d]*$/u.test(value)) {
        throw new TypeError('callingCode must be digits with optional space');
      }

      return value;
    });

    return args;
  }; // end sanitizeCallingCode

  const isValidPostalCode = (value) => {
    debug('call:isValidPostalCode(%o)', value);

    return (this.postalCodeRegEx == null && value == null)
      || (this.postalCodeRegEx && this.postalCodeRegEx.test(value));
  }; // end isValidPostalCode

  const set = (opt = {}) => {
    debug('call:set(%o)', opt);
    for (const key in opt) {
      this[key] = opt[key];
    }

    return this;
  }; // end set

  const get = (...args) => {
    debug('call:get(%o)', args);
    args = _.flatten(args);

    return _.pick(this, ...args);
  }; // end get

  Object.defineProperties(this, {
    VERSION: {
      enumerable: false,
      value: version,
      writable: false,
    },
    name: {
      enumerable: true,
      get: getName,
      set: setName,
    },
    getName: {
      value: getName,
      writable: false,
    },
    setName: {
      value: setName,
      writable: false,
    },
    iso2Code: {
      enumerable: true,
      get: getIso2Code,
      set: setIso2Code,
    },
    getIso2Code: {
      value: getIso2Code,
      writable: false,
    },
    setIso2Code: {
      value: setIso2Code,
      writable: false,
    },
    iso3Code: {
      enumerable: true,
      get: getIso3Code,
      set: setIso3Code,
    },
    getIso3Code: {
      value: getIso3Code,
      writable: false,
    },
    setIso3Code: {
      value: setIso3Code,
      writable: false,
    },
    isoNumericCode: {
      enumerable: true,
      get: getIsoNumericCode,
      set: setIsoNumericCode,
    },
    getIsoNumericCode: {
      value: getIsoNumericCode,
      writable: false,
    },
    setIsoNumericCode: {
      value: setIsoNumericCode,
      writable: false,
    },
    postalCodeRegEx: {
      enumerable: false,
      get: getPostalCodeRegEx,
      set: setPostalCodeRegEx,
    },
    getPostalCodeRegEx: {
      value: getPostalCodeRegEx,
      writable: false,
    },
    setPostalCodeRegEx: {
      value: setPostalCodeRegEx,
      writable: false,
    },
    callingCode: {
      enumerable: true,
      get: getCallingCode,
      set: setCallingCode,
    },
    getCallingCode: {
      value: getCallingCode,
      writable: false,
    },
    setCallingCode: {
      value: setCallingCode,
      writable: false,
    },
    addCallingCode: {
      value: addCallingCode,
      writable: false,
    },
    removeCallingCode: {
      value: removeCallingCode,
      writable: false,
    },
    hasCallingCode: {
      value: hasCallingCode,
      writable: false,
    },
    hasAnyCallingCodes: {
      value: hasAnyCallingCodes,
      writable: false,
    },
    hasAllCallingCodes: {
      value: hasAllCallingCodes,
      writable: false,
    },
    isValidPostalCode: {
      value: isValidPostalCode,
      writable: false,
    },
    get: {
      value: get,
      writable: false,
    },
    set: {
      value: set,
      writable: false,
    },
    [Symbol.toStringTag]: {
      value: '@scuba-squad/country',
      writable: false,
    },
  });

  Object.freeze(this);

  return this.set(opt);
}; // end Country class definition

// static methods
Country.getByIso2Code = (value) => {
  debug('call:Country.getByIso2Code(%o)', value);
  value = _.findWhere(countries, {
    iso2Code: value,
  });

  return (value && new Country(value)) || false;
}; // end Country.getByIso2Code

Country.getByIso3Code = (value) => {
  debug('call:Country.getByIso3Code(%o)', value);
  value = _.findWhere(countries, {
    iso3Code: value,
  });

  return (value && new Country(value)) || false;
}; // end Country.getByIso3Code

Country.getByIsoNumericCode = (value) => {
  debug('call:Country.getByIsoNumericCode(%o)', value);
  value = _.findWhere(countries, {
    isoNumericCode: value,
  });

  return (value && new Country(value)) || false;
}; // end Country.getByIsoNumericCode

Country.getByPostalCode = (value) => {
  debug('call:Country.getByPostalCode(%o)', value);
  const filtered = _.filter(countries, (country) => {
    if (value == null && country.postalCodeRegEx == null) {
      return true;
    }

    if (new Country(country).isValidPostalCode(value)) {
      return true;
    }

    return false;
  });

  return (filtered && filtered.length && _.map(filtered, Country)) || false;
}; // end Country.getByPostalCode

Country.getByCallingCode = (value) => {
  debug('call:Country.getByCallingCode(%o)', value);
  const filtered = _.filter(countries, (country) => {
    return new Country(country).hasCallingCode(value);
  });

  return (filtered && filtered.length && _.map(filtered, Country)) || false;
}; // end Country.getByCallingCode

// export Country as a commonjs module
module.exports = Country;