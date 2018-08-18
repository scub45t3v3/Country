'use strict';

(() => {
  // include dependecies
  const _ = require('underscore');
  const debug = require('debug')('Country');
  const {version} = require('./package');
  const countries = require('./countries');

  // Country class definition
  const Country = function(opt = {}) {
    debug('call:Country(%o)', opt);

    // define auto instantiation
    if (!new.target) {
      debug('re-call:Country with new operator');

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
      value = value && (value.toString() || `${value}`).trim();

      if (value != null && !_.isString(value)) {
        debug('error:name = %o', value);

        throw new TypeError('name must be a string');
      }

      debug('before:set:name = %s', name);
      name = value || undefined;
      debug('after:set:name = %s', name);

      return this;
    };

    const getName = () => {
      debug('call:getName()');

      return name;
    };

    const setIso2Code = (value) => {
      debug('call:setIso2Code(%o)', value);
      value = value && (value.toString() || `${value}`).trim().toUpperCase();

      if ((value != null) && !/^[a-z]{2}$/i.test(value)) {
        debug('error:iso2Code = %o', value);

        throw new TypeError('iso2Code must be 2 char alpha string');
      }

      debug('before:set:iso2Code = %s', iso2Code);
      iso2Code = value || undefined;
      debug('after:set:iso2Code = %s', iso2Code);

      return this;
    };

    const getIso2Code = () => {
      debug('call:getIso2Code()');

      return iso2Code;
    };

    const setIso3Code = (value) => {
      debug('call:setIso3Code(%o)', value);
      value = value && (value.toString() || `${value}`).trim().toUpperCase();

      if ((value != null) && !/^[a-z]{3}$/i.test(value)) {
        debug('error:iso3Code = %o', value);

        throw new TypeError('iso3Code must be 3 char alpha string');
      }

      debug('before:set:iso3Code = %s', iso3Code);
      iso3Code = value || undefined;
      debug('after:set:iso3Code = %s', iso3Code);

      return this;
    };

    const getIso3Code = () => {
      debug('call:getIso3Code()');

      return iso3Code;
    };

    const setIsoNumericCode = (value) => {
      debug('call:setIsoNumericCode(%o)', value);
      value = value && (value.toString() || `${value}`).trim();

      if (value != null && value != '000' && !/^\d{3}$/.test(value)) {
        debug('error:isoNumericCode = %o', value);

        throw new TypeError('isoNumericCode must be a 3 digit string');
      }

      debug('before:set:isoNumericCode = %s', value);
      isoNumericCode = value || undefined;
      debug('after:set:isoNumericCode = %s', value);

      return this;
    };

    const getIsoNumericCode = () => {
      debug('call:getIsoNumericCode()');

      return isoNumericCode;
    };

    const setPostalCodeRegEx = (value) => {
      debug('call:setPostalCodeRegEx(%o)', value);

      if (value != null && !(value instanceof RegExp)) {
        debug('error:postalCodeRegEx = %o', value);

        throw new TypeError('postalCodeRegEx must be a RegExp');
      }

      debug('before:set:postalCodeRegEx = %o', postalCodeRegEx);
      postalCodeRegEx = value;
      debug('after:set:postalCodeRegEx = %o', postalCodeRegEx);

      return this;
    };

    const getPostalCodeRegEx = () => {
      debug('call:getPostalCodeRegEx()');

      return postalCodeRegEx;
    };

    const hasCallingCode = (value) => {
      debug('call:hasCallingCode(%o)', value);
      value = _.first(sanitizeCallingCode(value));

      return (value == null && callingCode == null)
          || _.contains(callingCode, value);
    };

    const hasAnyCallingCodes = (...args) => {
      debug('call:hasAnyCallingCodes(%o)', args);
      args = sanitizeCallingCode(...args);

      return _.any(args, hasCallingCode);
    };

    const hasAllCallingCodes = (...args) => {
      debug('call:hasAllCallingCodes(%o)', args);
      args = sanitizeCallingCode(...args);

      return _.all(args, hasCallingCode);
    };

    const addCallingCode = (...args) => {
      debug('call:addCallingCode(%o)', args);
      args = sanitizeCallingCode(...args);

      debug('before:add:callingCode = %o', callingCode);
      if (args == null) {
        callingCode = args;
      } else if (args.length) {
        callingCode = _.union(callingCode, args);
      }

      debug('after:add:callingCode = %o', callingCode);

      return this;
    };

    const removeCallingCode = (...args) => {
      debug('call:removeCallingCode(%o)', args);
      args = sanitizeCallingCode(...args);

      debug('before:remove:callingCode = %o', callingCode);
      callingCode = _.without(callingCode, ...args);

      if (!callingCode.length) {
        callingCode = undefined;
      }

      debug('after:remove:callingCode = %o', callingCode);

      return this;
    };

    const setCallingCode = (...args) => {
      debug('call:setCallingCode(%o)', args);
      debug('before:reset:callingCode = %o', callingCode);
      callingCode = undefined;

      this.addCallingCode(...args);

      return this;
    };

    const getCallingCode = () => {
      debug('call:getCallingCode()');

      return _.clone(callingCode);
    };

    const sanitizeCallingCode = (...args) => {
      debug('call:sanitizeCallingCode(%o)', args);
      args = _.flatten(args);

      // Check for null or undefined to set the callingCode
      if (args.length < 2 && _.first(args) == null) {
        debug('sanitized:callingCode = %o', _.first(args));

        return _.first(args);
      }

      args = _.map(args, (value) => {
        value = (value && (value.toString() || `${value}`).trim()) || '';
        value = value
          .replace(/^\+*\s*/, '+')
          .replace(/\s+/, ' ');

        if (!/^\+[1-9][\s\d]*$/.test(value)) {
          debug('error:callingCode = %o', value);

          throw new TypeError('callingCode must be digits with optional space');
        }

        return value;
      });

      debug('sanitized:callingCode = %o', args);

      return args;
    };

    const set = (opt = {}) => {
      debug('call:set(%o)', opt);

      for (const key in opt) {
        this[key] = opt[key];
      }

      return this;
    };

    const get = (...args) => {
      debug('call:get(%o)', args);

      args = _.flatten(args);

      return _.pick(this, ...args);
    };

    const isValidPostalCode = (value) => {
      debug('call:isValidPostalCode(%o)', value);

      return (this.postalCodeRegEx == null && value == null)
          || (this.postalCodeRegEx && this.postalCodeRegEx.test(value));
    };

    Object.defineProperties(this, {
      VERSION: {
        enumerable: false,
        writable: false,
        value: version,
      },
      name: {
        enumerable: true,
        get: getName,
        set: setName,
      },
      getName: {
        writable: false,
        value: getName,
      },
      get_name: {
        writable: false,
        value: getName,
      },
      setName: {
        writable: false,
        value: setName,
      },
      set_name: {
        writable: false,
        value: setName,
      },
      iso2Code: {
        enumerable: true,
        get: getIso2Code,
        set: setIso2Code,
      },
      iso2code: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      iso_2_code: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      iso2: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      iso_2: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      alpha2Code: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      alpha2code: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      alpha_2_code: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      alpha2: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      alpha_2: {
        enumerable: false,
        get: getIso2Code,
        set: setIso2Code,
      },
      getIso2Code: {
        writable: false,
        value: getIso2Code,
      },
      get_iso_2_code: {
        writable: false,
        value: getIso2Code,
      },
      getAlpha2Code: {
        writable: false,
        value: getIso2Code,
      },
      get_alpha_2_code: {
        writable: false,
        value: getIso2Code,
      },
      setIso2Code: {
        writable: false,
        value: setIso2Code,
      },
      set_iso_2_code: {
        writable: false,
        value: setIso2Code,
      },
      setAlpha2Code: {
        writable: false,
        value: setIso2Code,
      },
      set_alpha_2_code: {
        writable: false,
        value: setIso2Code,
      },
      iso3Code: {
        enumerable: true,
        get: getIso3Code,
        set: setIso3Code,
      },
      iso3code: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      iso_3_code: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      iso3: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      iso_3: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      alpha3Code: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      alpha3code: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      alpha_3_code: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      alpha3: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      alpha_3: {
        enumerable: false,
        get: getIso3Code,
        set: setIso3Code,
      },
      getIso3Code: {
        writable: false,
        value: getIso3Code,
      },
      get_iso_3_code: {
        writable: false,
        value: getIso3Code,
      },
      getAlpha3Code: {
        writable: false,
        value: getIso3Code,
      },
      get_alpha_3_code: {
        writable: false,
        value: getIso3Code,
      },
      setIso3Code: {
        writable: false,
        value: setIso3Code,
      },
      set_iso_3_code: {
        writable: false,
        value: setIso3Code,
      },
      setAlpha3Code: {
        writable: false,
        value: setIso3Code,
      },
      set_alpha_3_code: {
        writable: false,
        value: setIso3Code,
      },
      isoNumericCode: {
        enumerable: true,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      isoNumeric: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      iso_numeric: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      isoId: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      iso_id: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      numericCode: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      numericcode: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      numeric_code: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      id: {
        enumerable: false,
        get: getIsoNumericCode,
        set: setIsoNumericCode,
      },
      getIsoNumericCode: {
        writable: false,
        value: getIsoNumericCode,
      },
      getIsoId: {
        writable: false,
        value: getIsoNumericCode,
      },
      getNumericCode: {
        writable: false,
        value: getIsoNumericCode,
      },
      getId: {
        writable: false,
        value: getIsoNumericCode,
      },
      get_iso_numeric_code: {
        writable: false,
        value: getIsoNumericCode,
      },
      get_iso_id: {
        writable: false,
        value: getIsoNumericCode,
      },
      get_numeric_code: {
        writable: false,
        value: getIsoNumericCode,
      },
      get_id: {
        writable: false,
        value: getIsoNumericCode,
      },
      setIsoNumericCode: {
        writable: false,
        value: setIsoNumericCode,
      },
      setIsoId: {
        writable: false,
        value: setIsoNumericCode,
      },
      setNumericCode: {
        writable: false,
        value: setIsoNumericCode,
      },
      setId: {
        writable: false,
        value: setIsoNumericCode,
      },
      set_iso_numeric_code: {
        writable: false,
        value: setIsoNumericCode,
      },
      set_numeric_code: {
        writable: false,
        value: setIsoNumericCode,
      },
      set_iso_id: {
        writable: false,
        value: setIsoNumericCode,
      },
      set_id: {
        writable: false,
        value: setIsoNumericCode,
      },
      postalCodeRegEx: {
        enumerable: false,
        get: getPostalCodeRegEx,
        set: setPostalCodeRegEx,
      },
      postalCodeRegExp: {
        enumerable: false,
        get: getPostalCodeRegEx,
        set: getPostalCodeRegEx,
      },
      postalcoderegex: {
        enumerable: false,
        get: getPostalCodeRegEx,
        set: getPostalCodeRegEx,
      },
      postalcoderegexp: {
        enumerable: false,
        get: getPostalCodeRegEx,
        set: getPostalCodeRegEx,
      },
      postal_code_reg_ex: {
        enumerable: false,
        get: getPostalCodeRegEx,
        set: setPostalCodeRegEx,
      },
      postal_code_reg_exp: {
        enumerable: false,
        get: getPostalCodeRegEx,
        set: setPostalCodeRegEx,
      },
      getPostalCodeRegEx: {
        writable: false,
        value: getPostalCodeRegEx,
      },
      getPostalCodeRegExp: {
        writable: false,
        value: getPostalCodeRegEx,
      },
      get_postal_code_reg_ex: {
        writable: false,
        value: getPostalCodeRegEx,
      },
      get_postal_code_reg_exp: {
        writable: false,
        value: getPostalCodeRegEx,
      },
      setPostalCodeRegEx: {
        writable: false,
        value: setPostalCodeRegEx,
      },
      setPostalCodeRegExp: {
        writable: false,
        value: setPostalCodeRegEx,
      },
      set_postal_code_reg_ex: {
        writable: false,
        value: setPostalCodeRegEx,
      },
      set_postal_code_reg_exp: {
        writable: false,
        value: setPostalCodeRegEx,
      },
      callingCode: {
        enumerable: true,
        get: getCallingCode,
        set: setCallingCode,
      },
      callingCodes: {
        enumerable: false,
        get: getCallingCode,
        set: setCallingCode,
      },
      callingcode: {
        enumerable: false,
        get: getCallingCode,
        set: setCallingCode,
      },
      callingcodes: {
        enumerable: false,
        get: getCallingCode,
        set: setCallingCode,
      },
      calling_code: {
        enumerable: false,
        get: getCallingCode,
        set: setCallingCode,
      },
      calling_codes: {
        enumerable: false,
        get: getCallingCode,
        set: setCallingCode,
      },
      getCallingCode: {
        writable: false,
        value: getCallingCode,
      },
      get_calling_code: {
        writable: false,
        value: getCallingCode,
      },
      setCallingCode: {
        writable: false,
        value: setCallingCode,
      },
      set_calling_code: {
        writable: false,
        value: setCallingCode,
      },
      addCallingCode: {
        writable: false,
        value: addCallingCode,
      },
      add_calling_code: {
        writable: false,
        value: addCallingCode,
      },
      removeCallingCode: {
        writable: false,
        value: removeCallingCode,
      },
      remove_calling_code: {
        writable: false,
        value: removeCallingCode,
      },
      hasCallingCode: {
        writable: false,
        value: hasCallingCode,
      },
      has_calling_code: {
        writable: false,
        value: hasCallingCode,
      },
      hasAnyCallingCodes: {
        writable: false,
        value: hasAnyCallingCodes,
      },
      has_any_calling_codes: {
        writable: false,
        value: hasAnyCallingCodes,
      },
      hasAllCallingCodes: {
        writable: false,
        value: hasAllCallingCodes,
      },
      has_all_calling_codes: {
        writable: false,
        value: hasAllCallingCodes,
      },
      get: {
        writable: false,
        value: get,
      },
      set: {
        writable: false,
        value: set,
      },
      isValidPostalCode: {
        writable: false,
        value: isValidPostalCode,
      },
      isPostalCodeValid: {
        writable: false,
        value: isValidPostalCode,
      },
      is_valid_postal_code: {
        writable: false,
        value: isValidPostalCode,
      },
      is_postal_code_valid: {
        writable: false,
        value: isValidPostalCode,
      },
      [Symbol.toStringTag]: {
        writable: false,
        value: '@scuba-squad/country',
      },
    });

    Object.freeze(this);

    return this.set(opt);
  };

  // static getByIso2Code method
  Country.getByIso2Code = (value) => {
    debug('call:Country.getByIso2Code(%o)', value);

    value = _.findWhere(countries, {
      iso2Code: value,
    });

    debug('db:found %o', value);

    return (value && new Country(value)) || false;
  }; // end Country.getByIso2Code

  // static getByIso3Code method
  Country.getByIso3Code = (value) => {
    debug('call:Country.getByIso3Code(%o)', value);

    value = _.findWhere(countries, {
      iso3Code: value,
    });

    debug('db:found %o', value);

    return (value && new Country(value)) || false;
  }; // end Country.getByIso3Code

  // static getByIsoNumericCode method
  Country.getByIsoNumericCode = (value) => {
    debug('call:Country.getByIsoNumericCode(%o)', value);

    value = _.findWhere(countries, {
      isoNumericCode: value,
    });

    debug('db:found %o', value);

    return (value && new Country(value)) || false;
  }; // end Country.getByIsoNumericCode

  // static getByCallingCode method
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

    debug('db:found %o', filtered);

    return (filtered && filtered.length && _.map(filtered, Country)) || false;
  }; // end Country.getByPostalCode

  // static getByCallingCode method
  Country.getByCallingCode = (value) => {
    debug('call:Country.getByCallingCode(%o)', value);

    const filtered = _.filter(countries, (country) => {
      return new Country(country).hasCallingCode(value);
    });

    debug('db:found %o', filtered);

    return (filtered && filtered.length && _.map(filtered, Country)) || false;
  }; // end Country.getByCallingCode

  // export Country as a commonjs module
  module.exports = Country;
})(); // end IIFE