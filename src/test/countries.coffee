unit = require 'unit.js'
countries = require '../countries'

describe 'countries', ->
  it 'should be an array of v object literals', ->
    unit
      .array countries
      .hasLength 249
      .matchEach (v) ->
        return !!(v.name && v.iso2Code && v.iso3Code && v.isoNumericCode)

    return null