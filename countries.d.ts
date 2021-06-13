interface ICountry {
  name: string;
  iso2Code: string;
  iso3Code: string;
  isoNumericCode: string;
  postalCodeRegEx?: RegExp;
  callingCode?: string | string[];
}

export const countries: ICountry[];