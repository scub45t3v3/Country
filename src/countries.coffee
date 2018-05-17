_ = require 'underscore'
countries = require '@scuba-squad/country-db'

module.exports = _.map countries, (country) ->
  if country.postalCodeRegEx
    country.postalCodeRegEx = new RegExp "^#{country.postalCodeRegEx}$", 'i'

  return country