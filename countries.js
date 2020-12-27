// include dependencies
import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const db = require('@scuba-squad/country-db');

const countries = db.map((country) => {
  if (country.postalCodeRegEx) {
    country.postalCodeRegEx = new RegExp(`^${country.postalCodeRegEx}$`, 'iu');
  }

  return country;
});

// export as js module
export {countries as default};