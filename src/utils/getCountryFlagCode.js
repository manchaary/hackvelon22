import { countryToAlpha2 } from "country-to-iso";

export const getCountryFlagCode = (countryName) => {
  return countryToAlpha2(countryName).toLowerCase() || "xx";
};
