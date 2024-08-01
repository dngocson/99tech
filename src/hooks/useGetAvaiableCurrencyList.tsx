import { useState, useEffect } from "react";
import api from "../libs/axios";
import { CURRENCY_CODE } from "../libs/constant";

interface CurrencyResponse {
  conversion_rates: Record<string, number>;
}

interface Country {
  Country: string;
  CountryCode: string;
  Currency: string;
  Code: string;
}

interface CountryMapping {
  [code: string]: Country;
}

export function useGetAvailableCurrencyList() {
  const [currencyList, setCurrencyList] = useState<Country[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCurrencyList = async () => {
      try {
        const response = await api.get<CurrencyResponse>("latest/USD", {
          signal: abortController.signal,
        });
        const currencies = response.data.conversion_rates;

        const countryMapping: CountryMapping = CURRENCY_CODE.reduce(
          (acc, country) => {
            acc[country.Code] = country;
            return acc;
          },
          {} as CountryMapping
        );

        const transformed = Object.keys(currencies)
          .filter((key) => countryMapping[key])
          .map((key) => countryMapping[key]);

        setCurrencyList(transformed);
      } catch (error) {
        console.error("Failed to fetch currency list:", error);
      }
    };

    fetchCurrencyList();

    return () => {
      abortController.abort();
    };
  }, []);

  return currencyList;
}
