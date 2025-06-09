import { Country, State, City } from 'country-state-city';

export const getAllCountries = () => Country.getAllCountries();

export const getStatesOfCountry = (countryCode: string) =>
  State.getStatesOfCountry(countryCode);

export const getCitiesOfState = (countryCode: string, stateCode: string) =>
  City.getCitiesOfState(countryCode, stateCode);
