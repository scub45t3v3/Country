_ = require 'underscore'
{version} = require './package'
countries = require '@scuba-squad/country-db'
countries = _.map countries, (country) ->
  if country.postalCodeRegEx
    country.postalCodeRegEx = new RegExp "^#{country.postalCodeRegEx}$", 'i'

  return country

Country = (opt = {}) ->
  if !(this instanceof Country)
    return new Country opt

  name = undefined
  iso2Code = undefined
  iso3Code = undefined
  isoNumericCode = undefined
  callingCode = undefined
  postalCodeRegEx = undefined

  setName = (value) ->
    if value? && !_.isString(value.toString?())
      throw new TypeError 'name must be a string'

    name = value?.toString?()?.trim?()

    return this

  getName = ->
    return name

  setIso2Code = (value) ->
    value = value?.toString?().trim().toUpperCase()

    if value? && !/^[a-z]{2}$/i.test(value)
      throw new TypeError "#{value} must be valid iso2Code"

    iso2Code = value

    return this

  getIso2Code = ->
    return iso2Code

  setIso3Code = (value) ->
    value = value?.toString?().trim().toUpperCase()

    if value? && !/^[a-z]{3}$/i.test(value)
      throw new TypeError "#{value} must be valid iso3Code"

    iso3Code = value

    return this

  getIso3Code = ->
    return iso3Code

  setIsoNumericCode = (value) ->
    value = value?.toString?().trim()

    if value? && !/^\d{3}$/.test(value)
      throw new TypeError "#{value} must be valid isoNumericCode"

    isoNumericCode = value

    return this

  getIsoNumericCode = ->
    return isoNumericCode

  setPostalCodeRegEx = (value) ->
    if value? && !(value instanceof RegExp)
      throw new TypeError "#{value} must be a RegExp"

    postalCodeRegEx = value

    return this

  getPostalCodeRegEx = ->
    return postalCodeRegEx

  hasCallingCode = (value) ->
    value = sanitizeCallingCode value
    value = _.first value

    return (!value? && !callingCode?) || _.contains callingCode, value

  hasAnyCallingCodes = (args...) ->
    args = sanitizeCallingCode args...

    return _.any args, hasCallingCode

  hasAllCallingCodes = (args...) ->
    args = sanitizeCallingCode args...

    return _.every args, hasCallingCode

  addCallingCode = (args...) ->
    args = sanitizeCallingCode args...

    if !args?
      callingCode = args
    else if args?.length
      callingCode = _.union callingCode, args

    return this

  removeCallingCode = (args...) ->
    args = sanitizeCallingCode args...
    callingCode = _.without callingCode, args...

    if !callingCode?.length
      callingCode = undefined

    return this

  setCallingCode = (args...) ->
    callingCode = undefined

    @addCallingCode args...

    return this

  getCallingCode = ->
    return callingCode

  sanitizeCallingCode = (args...) ->
    args = _.flatten args

    #Check for null or undefined to set the callingCode
    if args?.length < 2 && !args?[0]?
      return args?[0]

    args = _.map args, (value) ->
      value = value?.toString?().trim() || ''
      value = value.replace /^\+*\s*/, '+'
      value = value.replace /\s+/, ' '

      if !/^\+[1-9][\s\d]*$/.test(value)
        throw new TypeError "#{value} must be valid callingCode"

      return value

    return args

  set = (opt = {}) ->
    for key, value of opt
      @[key] = value

    return this

  get = (args...) ->
    args = _.flatten args

    return _.pick this, args...

  isValidPostalCode = (value) ->
    return (!@postalCodeRegEx? && !value?) || !!@postalCodeRegEx?.test?(value)

  Object.defineProperties this,
    VERSION:
      enumerable: false
      writable: false
      value: version
    name:
      enumerable: true
      get: getName
      set: setName
    getName:
      writable: false
      value: getName
    get_name:
      writable: false
      value: getName
    setName:
      writable: false
      value: setName
    set_name:
      writable: false
      value: setName
    iso2Code:
      enumerable: true
      get: getIso2Code
      set: setIso2Code
    iso2code:
      enumerable: false
      get: getIso2Code
      set: setIso2Code
    iso_2_code:
      enumerable: false
      get: getIso2Code
      set: setIso2Code
    iso2:
      enumerable: false
      get: getIso2Code
      set: setIso2Code
    iso_2:
      enumerable: false
      get: getIso2Code
      set: setIso2Code
    getIso2Code:
      writable: false
      value: getIso2Code
    get_iso_2_code:
      writable: false
      value: getIso2Code
    setIso2Code:
      writable: false
      value: setIso2Code
    set_iso_2_code:
      writable: false
      value: setIso2Code
    iso3Code:
      enumerable: true
      get: getIso3Code
      set: setIso3Code
    iso3code:
      enumerable: false
      get: getIso3Code
      set: setIso3Code
    iso_3_code:
      enumerable: false
      get: getIso3Code
      set: setIso3Code
    iso3:
      enumerable: false
      get: getIso3Code
      set: setIso3Code
    iso_3:
      enumerable: false
      get: getIso3Code
      set: setIso3Code
    getIso3Code:
      writable: false
      value: getIso3Code
    get_iso_3_code:
      writable: false
      value: getIso3Code
    setIso3Code:
      writable: false
      value: setIso3Code
    set_iso_3_code:
      writable: false
      value: setIso3Code
    isoNumericCode:
      enumerable: true
      get: getIsoNumericCode
      set: setIsoNumericCode
    isoNumeric:
      enumerable: false
      get: getIsoNumericCode
      set: setIsoNumericCode
    iso_numeric:
      enumerable: false
      get: getIsoNumericCode
      set: setIsoNumericCode
    isoId:
      enumerable: false
      get: getIsoNumericCode
      set: setIsoNumericCode
    iso_id:
      enumerable: false
      get: getIsoNumericCode
      set: setIsoNumericCode
    getIsoNumericCode:
      writable: false
      value: getIsoNumericCode
    getIsoId:
      writable: false
      value: getIsoNumericCode
    get_iso_numeric_code:
      writable: false
      value: getIsoNumericCode
    get_iso_id:
      writable: false
      value: getIsoNumericCode
    setIsoNumericCode:
      writable: false
      value: setIsoNumericCode
    setIsoId:
      writable: false
      value: setIsoNumericCode
    set_iso_id:
      writable: false
      value: setIsoNumericCode
    set_iso_numeric_code:
      writable: false
      value: setIsoNumericCode
    postalCodeRegEx:
      enumerable: false
      get: getPostalCodeRegEx
      set: setPostalCodeRegEx
    postalCodeRegExp:
      enumerable: false
      get: getPostalCodeRegEx
      set: getPostalCodeRegEx
    postal_code_reg_ex:
      enumerable: false
      get: getPostalCodeRegEx
      set: setPostalCodeRegEx
    postal_code_reg_exp:
      enumerable: false
      get: getPostalCodeRegEx
      set: setPostalCodeRegEx
    getPostalCodeRegEx:
      writable: false
      value: getPostalCodeRegEx
    getPostalCodeRegExp:
      writable: false
      value: getPostalCodeRegEx
    get_postal_code_reg_ex:
      writable: false
      value: getPostalCodeRegEx
    get_postal_code_reg_exp:
      writable: false
      value: getPostalCodeRegEx
    setPostalCodeRegEx:
      writable: false
      value: setPostalCodeRegEx
    setPostalCodeRegExp:
      writable: false
      value: setPostalCodeRegEx
    set_postal_code_reg_ex:
      writable: false
      value: setPostalCodeRegEx
    set_postal_code_reg_exp:
      writable: false
      value: setPostalCodeRegEx
    callingCode:
      enumerable: true
      get: getCallingCode
      set: setCallingCode
    calling_code:
      enumerable: false
      get: getCallingCode
      set: setCallingCode
    getCallingCode:
      writable: false
      value: getCallingCode
    get_calling_code:
      writable: false
      value: getCallingCode
    setCallingCode:
      writable: false
      value: setCallingCode
    set_calling_code:
      writable: false
      value: setCallingCode
    addCallingCode:
      writable: false
      value: addCallingCode
    add_calling_code:
      writable: false
      value: addCallingCode
    removeCallingCode:
      writable: false
      value: removeCallingCode
    remove_calling_code:
      writable: false
      value: removeCallingCode
    hasCallingCode:
      writable: false
      value: hasCallingCode
    has_calling_code:
      writable: false
      value: hasCallingCode
    hasAnyCallingCodes:
      writable: false
      value: hasAnyCallingCodes
    has_any_calling_codes:
      writable: false
      value: hasAnyCallingCodes
    hasAllCallingCodes:
      writable: false
      value: hasAllCallingCodes
    has_all_calling_codes:
      writable: false
      value: hasAllCallingCodes
    get:
      writable: false
      value: get
    set:
      writable: false
      value: set
    isValidPostalCode:
      writable: false
      value: isValidPostalCode
    isPostalCodeValid:
      writable: false
      value: isValidPostalCode
    is_valid_postal_code:
      writable: false
      value: isValidPostalCode
    is_postal_code_valid:
      writable: false
      value: isValidPostalCode

  Object.seal this

  return @set opt

Country.getByIso2Code = (value) ->
  value = _.findWhere countries,
    iso2Code: value

  return (value && new Country(value)) || false

Country.getByIso3Code = (value) ->
  value = _.findWhere countries,
    iso3Code: value

  return (value && new Country(value)) || false

Country.getByIsoNumericCode = (value) ->
  value = _.findWhere countries,
    isoNumericCode: value

  return (value && new Country(value)) || false

Country.getByPostalCode = (value) ->
  filtered = _.filter countries, (country) ->
    if !value? && !country?.postalCodeRegEx?
      return true

    if new Country(country).isValidPostalCode(value)
      return true

    return false

  return (filtered?.length && _.map(filtered, Country)) || false

Country.getByCallingCode = (value) ->
  filtered = _.filter countries, (country) ->
    return new Country(country).hasCallingCode(value)

  return (filtered?.length && _.map(filtered, Country)) || false

module.exports = Country