interface ICountry {
  name?: string;
  iso2Code?: string;
  iso3Code?: string;
  isoNumericCode?: string;
  postalCodeRegEx?: RegExp;
  callingCode?: string | string[];
}

declare class Country implements ICountry {
  static VERSION: string;
  name?: string;
  iso2Code?: string;
  iso3Code?: string;
  isoNumericCode?: string;
  postalCodeRegEx?: RegExp;
  callingCode?: string | string[];
  constructor(opt?: ICountry);
  getName(): string;
  getIso2Code(): string;
  getIso3Code(): string;
  getIsoNumbericCode(): string;
  getPostalCodeRegEx(): RegExp;
  getCallingCode(): string | string[];
  setName(value?: any): Country;
  setIso2Code(value?: any): Country;
  setIso3Code(value?: any): Country;
  setIsoNumbericCode(value?: any): Country;
  setPostalCodeRegEx(value?: RegExp): Country;
  setCallingCode(value?: any): Country;
  hasCallingCode(value?: any): boolean;
  hasAnyCallingCodes(...value: any): boolean;
  hasAllCallingCodes(...value: any): boolean;
  addCallingCode(value?: any): Country;
  removeCallingCode(value?: any): Country;
  isValidPostalCode(value?: any): boolean;
  set(opt: ICountry): Country;
  get(...value: any): Record<string, any>;
  [Symbol.toStringTag]: string;
  static getByIso2Code(code?: string): Country | false;
  static getByIso3Code(code?: string): Country | false;
  static getByIsoNumericCode(code?: string): Country | false;
  static getByPostalCode(code?: string): Country[] | false;
  static getByCallingCode(code?: string): Country[] | false;
}

export default Country;