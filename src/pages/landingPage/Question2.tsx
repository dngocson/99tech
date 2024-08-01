import { Button, Flex, Modal, NumberInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CustomDropdownInput } from "../../component/_common/CustomDropdownInput";
import { useState } from "react";
import api from "../../libs/axios";

// Define types for currency and country data

const mockData = [
  {
    Country: "US Armed Forces",
    CountryCode: "USAF",
    Currency: "US Dollar",
    Code: "USD",
  },
  {
    Country: "United Arab Emirates",
    CountryCode: "AE",
    Currency: "Dirham",
    Code: "AED",
  },
  {
    Country: "Afghanistan",
    CountryCode: "AF",
    Currency: "Afghani",
    Code: "AFN",
  },
  {
    Country: "Albania",
    CountryCode: "AL",
    Currency: "Lek",
    Code: "ALL",
  },
  {
    Country: "Armenia",
    CountryCode: "AM",
    Currency: "Dram",
    Code: "AMD",
  },
  {
    Country: "Saint Martin (French part)",
    CountryCode: "MF",
    Currency: "Netherlands Antillean guilder",
    Code: "ANG",
  },
  {
    Country: "Angola",
    CountryCode: "AO",
    Currency: "Angolan kwanza",
    Code: "AOA",
  },
  {
    Country: "Argentina",
    CountryCode: "AR",
    Currency: "Peso",
    Code: "ARS",
  },
  {
    Country: "Tuvalu",
    CountryCode: "TV",
    Currency: "Australian Dollars",
    Code: "AUD",
  },
  {
    Country: "Azerbaijan",
    CountryCode: "AZ",
    Currency: "Manat",
    Code: "AZN",
  },
  {
    Country: "Bosnia and Herzegovina",
    CountryCode: "BA",
    Currency: "Bosnia and Herzegovina convertible mark",
    Code: "BAM",
  },
  {
    Country: "Barbados",
    CountryCode: "BB",
    Currency: "Barbadian Dollar",
    Code: "BBD",
  },
  {
    Country: "Bangladesh",
    CountryCode: "BD",
    Currency: "Taka",
    Code: "BDT",
  },
  {
    Country: "Bulgaria",
    CountryCode: "BG",
    Currency: "Lev",
    Code: "BGN",
  },
  {
    Country: "Bahrain",
    CountryCode: "BH",
    Currency: "Bahraini Dinar",
    Code: "BHD",
  },
  {
    Country: "Burundi",
    CountryCode: "BI",
    Currency: "Burundi Franc",
    Code: "BIF",
  },
  {
    Country: "Bermuda",
    CountryCode: "BM",
    Currency: "Bermudian Dollar",
    Code: "BMD",
  },
  {
    Country: "Brunei Darussalam",
    CountryCode: "BN",
    Currency: "Bruneian Dollar",
    Code: "BND",
  },
  {
    Country: "Bolivia",
    CountryCode: "BO",
    Currency: "Boliviano",
    Code: "BOB",
  },
  {
    Country: "Brazil",
    CountryCode: "BR",
    Currency: "Brazil",
    Code: "BRL",
  },
  {
    Country: "Bahamas",
    CountryCode: "BS",
    Currency: "Bahamian Dollar",
    Code: "BSD",
  },
  {
    Country: "Botswana",
    CountryCode: "BW",
    Currency: "Pula",
    Code: "BWP",
  },
  {
    Country: "Belize",
    CountryCode: "BZ",
    Currency: "Belizean Dollar",
    Code: "BZD",
  },
  {
    Country: "Canada",
    CountryCode: "CA",
    Currency: "Canadian Dollar",
    Code: "CAD",
  },
  {
    Country: "Congo (Kinshasa)",
    CountryCode: "CD",
    Currency: "Congolese Frank",
    Code: "CDF",
  },
  {
    Country: "Switzerland",
    CountryCode: "CH",
    Currency: "Swiss Franc",
    Code: "CHF",
  },
  {
    Country: "Chile",
    CountryCode: "CL",
    Currency: "Chilean Peso",
    Code: "CLP",
  },
  {
    Country: "China",
    CountryCode: "CN",
    Currency: "Yuan Renminbi",
    Code: "CNY",
  },
  {
    Country: "Colombia",
    CountryCode: "CO",
    Currency: "Peso",
    Code: "COP",
  },
  {
    Country: "Costa Rica",
    CountryCode: "CR",
    Currency: "Costa Rican Colon",
    Code: "CRC",
  },
  {
    Country: "Cuba",
    CountryCode: "CU",
    Currency: "Cuban Peso",
    Code: "CUP",
  },
  {
    Country: "Cape Verde",
    CountryCode: "CV",
    Currency: "Escudo",
    Code: "CVE",
  },
  {
    Country: "Czech Republic",
    CountryCode: "CZ",
    Currency: "Koruna",
    Code: "CZK",
  },
  {
    Country: "Djibouti",
    CountryCode: "DJ",
    Currency: "Djiboutian Franc",
    Code: "DJF",
  },
  {
    Country: "Greenland",
    CountryCode: "GL",
    Currency: "Danish Krone",
    Code: "DKK",
  },
  {
    Country: "Dominican Republic",
    CountryCode: "DO",
    Currency: "Dominican Peso",
    Code: "DOP",
  },
  {
    Country: "Algeria",
    CountryCode: "DZ",
    Currency: "Algerian Dinar",
    Code: "DZD",
  },
  {
    Country: "Egypt",
    CountryCode: "EG",
    Currency: "Egyptian Pound",
    Code: "EGP",
  },
  {
    Country: "Ethiopia",
    CountryCode: "ET",
    Currency: "Ethiopian Birr",
    Code: "ETB",
  },
  {
    Country: "Saint Pierre and Miquelon",
    CountryCode: "PM",
    Currency: "Euro",
    Code: "EUR",
  },
  {
    Country: "Fiji",
    CountryCode: "FJ",
    Currency: "Fijian Dollar",
    Code: "FJD",
  },
  {
    Country: "Falkland Islands (Malvinas)",
    CountryCode: "FK",
    Currency: "Falkland Pound",
    Code: "FKP",
  },
  {
    Country: "Saint Helena",
    CountryCode: "SH",
    Currency: "Saint Helena pound",
    Code: "GBP",
  },
  {
    Country: "Georgia",
    CountryCode: "GE",
    Currency: "Lari",
    Code: "GEL",
  },
  {
    Country: "Guernsey",
    CountryCode: "GG",
    Currency: "Guernsey pound",
    Code: "GGP",
  },
  {
    Country: "Ghana",
    CountryCode: "GH",
    Currency: "Ghana cedi",
    Code: "GHS",
  },
  {
    Country: "Gibraltar",
    CountryCode: "GI",
    Currency: "Gibraltar Pound",
    Code: "GIP",
  },
  {
    Country: "Gambia",
    CountryCode: "GM",
    Currency: "Dalasi",
    Code: "GMD",
  },
  {
    Country: "Guinea",
    CountryCode: "GN",
    Currency: "Guinean Franc",
    Code: "GNF",
  },
  {
    Country: "Guatemala",
    CountryCode: "GT",
    Currency: "Quetzal",
    Code: "GTQ",
  },
  {
    Country: "Guyana",
    CountryCode: "GY",
    Currency: "Guyanaese Dollar",
    Code: "GYD",
  },
  {
    Country: "Hong Kong",
    CountryCode: "HK",
    Currency: "HKD",
    Code: "HKD",
  },
  {
    Country: "Honduras",
    CountryCode: "HN",
    Currency: "Lempira",
    Code: "HNL",
  },
  {
    Country: "Croatia (Hrvatska)",
    CountryCode: "HR",
    Currency: "Croatian Dinar",
    Code: "HRK",
  },
  {
    Country: "Haiti",
    CountryCode: "HT",
    Currency: "Gourde",
    Code: "HTG",
  },
  {
    Country: "Hungary",
    CountryCode: "HU",
    Currency: "Forint",
    Code: "HUF",
  },
  {
    Country: "Indonesia",
    CountryCode: "ID",
    Currency: "Indonesian Rupiah",
    Code: "IDR",
  },
  {
    Country: "Israel",
    CountryCode: "IL",
    Currency: "Shekel",
    Code: "ILS",
  },
  {
    Country: "India",
    CountryCode: "IN",
    Currency: "Indian Rupee",
    Code: "INR",
  },
  {
    Country: "Iraq",
    CountryCode: "IQ",
    Currency: "Iraqi Dinar",
    Code: "IQD",
  },
  {
    Country: "Iran (Islamic Republic of)",
    CountryCode: "IR",
    Currency: "Iranian Rial",
    Code: "IRR",
  },
  {
    Country: "Iceland",
    CountryCode: "IS",
    Currency: "Icelandic Krona",
    Code: "ISK",
  },
  {
    Country: "Jamaica",
    CountryCode: "JM",
    Currency: "Jamaican Dollar",
    Code: "JMD",
  },
  {
    Country: "Palestinian Territory",
    CountryCode: "PS",
    Currency: "Jordanian dinar",
    Code: "JOD",
  },
  {
    Country: "Japan",
    CountryCode: "JP",
    Currency: "Japanese Yen",
    Code: "JPY",
  },
  {
    Country: "Kenya",
    CountryCode: "KE",
    Currency: "Kenyan Shilling",
    Code: "KES",
  },
  {
    Country: "Kyrgyzstan",
    CountryCode: "KG",
    Currency: "Som",
    Code: "KGS",
  },
  {
    Country: "Cambodia",
    CountryCode: "KH",
    Currency: "Riel",
    Code: "KHR",
  },
  {
    Country: "Comoros",
    CountryCode: "KM",
    Currency: "Comoran Franc",
    Code: "KMF",
  },
  {
    Country: "Korea South",
    CountryCode: "KR",
    Currency: "Won",
    Code: "KRW",
  },
  {
    Country: "Kuwait",
    CountryCode: "KW",
    Currency: "Kuwaiti Dinar",
    Code: "KWD",
  },
  {
    Country: "Cayman Islands",
    CountryCode: "KY",
    Currency: "Caymanian Dollar",
    Code: "KYD",
  },
  {
    Country: "Kazakhstan",
    CountryCode: "KZ",
    Currency: "Tenge",
    Code: "KZT",
  },
  {
    Country: "Laos",
    CountryCode: "LA",
    Currency: "Lao kip",
    Code: "LAK",
  },
  {
    Country: "Lebanon",
    CountryCode: "LB",
    Currency: "Lebanese Pound",
    Code: "LBP",
  },
  {
    Country: "Sri Lanka",
    CountryCode: "LK",
    Currency: "Rupee",
    Code: "LKR",
  },
  {
    Country: "Liberia",
    CountryCode: "LR",
    Currency: "Liberian Dollar",
    Code: "LRD",
  },
  {
    Country: "Lesotho",
    CountryCode: "LS",
    Currency: "Loti",
    Code: "LSL",
  },
  {
    Country: "Libyan Arab Jamahiriya",
    CountryCode: "LY",
    Currency: "Libyan Dinar",
    Code: "LYD",
  },
  {
    Country: "Western Sahara",
    CountryCode: "EH",
    Currency: "Dirham",
    Code: "MAD",
  },
  {
    Country: "Moldova Republic of",
    CountryCode: "MD",
    Currency: "Leu",
    Code: "MDL",
  },
  {
    Country: "Madagascar",
    CountryCode: "MG",
    Currency: "Malagasy Franc",
    Code: "MGA",
  },
  {
    Country: "Macedonia",
    CountryCode: "MK",
    Currency: "Denar",
    Code: "MKD",
  },
  {
    Country: "Myanmar",
    CountryCode: "MM",
    Currency: "Kyat",
    Code: "MMK",
  },
  {
    Country: "Mongolia",
    CountryCode: "MN",
    Currency: "Tugrik",
    Code: "MNT",
  },
  {
    Country: "Macao S.A.R.",
    CountryCode: "MO",
    Currency: "Macanese pataca",
    Code: "MOP",
  },
  {
    Country: "Mauritius",
    CountryCode: "MU",
    Currency: "Mauritian Rupee",
    Code: "MUR",
  },
  {
    Country: "Maldives",
    CountryCode: "MV",
    Currency: "Rufiyaa",
    Code: "MVR",
  },
  {
    Country: "Malawi",
    CountryCode: "MW",
    Currency: "Malawian Kwacha",
    Code: "MWK",
  },
  {
    Country: "Mexico",
    CountryCode: "MX",
    Currency: "Peso",
    Code: "MXN",
  },
  {
    Country: "Malaysia",
    CountryCode: "MY",
    Currency: "Ringgit",
    Code: "MYR",
  },
  {
    Country: "Mozambique",
    CountryCode: "MZ",
    Currency: "Metical",
    Code: "MZN",
  },
  {
    Country: "Namibia",
    CountryCode: "NA",
    Currency: "Dollar",
    Code: "NAD",
  },
  {
    Country: "Nigeria",
    CountryCode: "NG",
    Currency: "Naira",
    Code: "NGN",
  },
  {
    Country: "Nicaragua",
    CountryCode: "NI",
    Currency: "Cordoba Oro",
    Code: "NIO",
  },
  {
    Country: "Svalbard and Jan Mayen Islands",
    CountryCode: "SJ",
    Currency: "Norwegian Krone",
    Code: "NOK",
  },
  {
    Country: "Nepal",
    CountryCode: "NP",
    Currency: "Nepalese Rupee",
    Code: "NPR",
  },
  {
    Country: "Tokelau",
    CountryCode: "TK",
    Currency: "New Zealand Dollars",
    Code: "NZD",
  },
  {
    Country: "Oman",
    CountryCode: "OM",
    Currency: "Sul Rial",
    Code: "OMR",
  },
  {
    Country: "Panama",
    CountryCode: "PA",
    Currency: "Balboa",
    Code: "PAB",
  },
  {
    Country: "Peru",
    CountryCode: "PE",
    Currency: "Nuevo Sol",
    Code: "PEN",
  },
  {
    Country: "Papua New Guinea",
    CountryCode: "PG",
    Currency: "Kina",
    Code: "PGK",
  },
  {
    Country: "Philippines",
    CountryCode: "PH",
    Currency: "Peso",
    Code: "PHP",
  },
  {
    Country: "Pakistan",
    CountryCode: "PK",
    Currency: "Rupee",
    Code: "PKR",
  },
  {
    Country: "Poland",
    CountryCode: "PL",
    Currency: "Zloty",
    Code: "PLN",
  },
  {
    Country: "Paraguay",
    CountryCode: "PY",
    Currency: "Guarani",
    Code: "PYG",
  },
  {
    Country: "Qatar",
    CountryCode: "QA",
    Currency: "Rial",
    Code: "QAR",
  },
  {
    Country: "Romania",
    CountryCode: "RO",
    Currency: "Leu",
    Code: "RON",
  },
  {
    Country: "Serbia",
    CountryCode: "RS",
    Currency: "Serbian dinar",
    Code: "RSD",
  },
  {
    Country: "Russian Federation",
    CountryCode: "RU",
    Currency: "Ruble",
    Code: "RUB",
  },
  {
    Country: "Rwanda",
    CountryCode: "RW",
    Currency: "Rwanda Franc",
    Code: "RWF",
  },
  {
    Country: "Saudi Arabia",
    CountryCode: "SA",
    Currency: "Riyal",
    Code: "SAR",
  },
  {
    Country: "Solomon Islands",
    CountryCode: "SB",
    Currency: "Solomon Islands Dollar",
    Code: "SBD",
  },
  {
    Country: "Seychelles",
    CountryCode: "SC",
    Currency: "Rupee",
    Code: "SCR",
  },
  {
    Country: "Sudan",
    CountryCode: "SD",
    Currency: "Dinar",
    Code: "SDG",
  },
  {
    Country: "Sweden",
    CountryCode: "SE",
    Currency: "Krona",
    Code: "SEK",
  },
  {
    Country: "Singapore",
    CountryCode: "SG",
    Currency: "Dollar",
    Code: "SGD",
  },
  {
    Country: "Sierra Leone",
    CountryCode: "SL",
    Currency: "Leone",
    Code: "SLL",
  },
  {
    Country: "Somalia",
    CountryCode: "SO",
    Currency: "Shilling",
    Code: "SOS",
  },
  {
    Country: "Suriname",
    CountryCode: "SR",
    Currency: "Surinamese Guilder",
    Code: "SRD",
  },
  {
    Country: "Syrian Arab Republic",
    CountryCode: "SY",
    Currency: "Syrian Pound",
    Code: "SYP",
  },
  {
    Country: "Swaziland",
    CountryCode: "SZ",
    Currency: "Lilangeni",
    Code: "SZL",
  },
  {
    Country: "Thailand",
    CountryCode: "TH",
    Currency: "Baht",
    Code: "THB",
  },
  {
    Country: "Tajikistan",
    CountryCode: "TJ",
    Currency: "Tajikistan Ruble",
    Code: "TJS",
  },
  {
    Country: "Turkmenistan",
    CountryCode: "TM",
    Currency: "Manat",
    Code: "TMT",
  },
  {
    Country: "Tunisia",
    CountryCode: "TN",
    Currency: "Tunisian Dinar",
    Code: "TND",
  },
  {
    Country: "Tonga",
    CountryCode: "TO",
    Currency: "PaÕanga",
    Code: "TOP",
  },
  {
    Country: "Turkey",
    CountryCode: "TR",
    Currency: "Lira",
    Code: "TRY",
  },
  {
    Country: "Trinidad and Tobago",
    CountryCode: "TT",
    Currency: "Trinidad and Tobago Dollar",
    Code: "TTD",
  },
  {
    Country: "Taiwan",
    CountryCode: "TW",
    Currency: "Dollar",
    Code: "TWD",
  },
  {
    Country: "Tanzania",
    CountryCode: "TZ",
    Currency: "Shilling",
    Code: "TZS",
  },
  {
    Country: "Ukraine",
    CountryCode: "UA",
    Currency: "Hryvnia",
    Code: "UAH",
  },
  {
    Country: "Uganda",
    CountryCode: "UG",
    Currency: "Shilling",
    Code: "UGX",
  },
  {
    Country: "Uruguay",
    CountryCode: "UY",
    Currency: "Peso",
    Code: "UYU",
  },
  {
    Country: "Uzbekistan",
    CountryCode: "UZ",
    Currency: "Som",
    Code: "UZS",
  },
  {
    Country: "Vietnam",
    CountryCode: "VN",
    Currency: "Dong",
    Code: "VND",
  },
  {
    Country: "Vanuatu",
    CountryCode: "VU",
    Currency: "Vatu",
    Code: "VUV",
  },
  {
    Country: "Gabon",
    CountryCode: "GA",
    Currency: "CFA Franc BEAC",
    Code: "XAF",
  },
  {
    Country: "Saint Vincent Grenadines",
    CountryCode: "VC",
    Currency: "East Caribbean Dollar",
    Code: "XCD",
  },
  {
    Country: "Togo",
    CountryCode: "TG",
    Currency: "CFA Franc BCEAO",
    Code: "XOF",
  },
  {
    Country: "Wallis and Futuna Islands",
    CountryCode: "WF",
    Currency: "CFP Franc",
    Code: "XPF",
  },
  {
    Country: "Yemen",
    CountryCode: "YE",
    Currency: "Rial",
    Code: "YER",
  },
  {
    Country: "South Africa",
    CountryCode: "ZA",
    Currency: "Rand",
    Code: "ZAR",
  },
];

const MOCK_RESULT = {
  result: "success",
  documentation: "https://www.exchangerate-api.com/docs",
  terms_of_use: "https://www.exchangerate-api.com/terms",
  time_last_update_unix: 1722470401,
  time_last_update_utc: "Thu, 01 Aug 2024 00:00:01 +0000",
  time_next_update_unix: 1722556801,
  time_next_update_utc: "Fri, 02 Aug 2024 00:00:01 +0000",
  base_code: "USD",
  target_code: "VND",
  conversion_rate: 25223.2293,
  conversion_result: 25223.2293,
};

import { useDisclosure } from "@mantine/hooks";
const Question2 = () => {
  // const currencyList = useGetAvailableCurrencyList();
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      peer: "",
      target: "",
      value: 0,
    },
  });
  const [comparedResult, setComparedResult] = useState();
  const onSelectHandler = (field: string, value: string) => {
    form.setFieldValue(field, value);
  };

  const calculateHandler = async () => {
    const formValues = form.getValues();
    // const exchangeResponse = await api.get(
    //   `/pair/${formValues.peer}/${formValues.target}/${formValues.value}`
    // );

    // setComparedResult(exchangeResponse.data);
    open();
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      direction={"column"}
      className="h-full py-4 "
    >
      <Flex
        direction={"column"}
        gap={16}
        className="border border-black rounded-lg p-12 shadow-lg shadow-red-300"
      >
        <Title className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Live Currency Exchange Form
        </Title>
        <NumberInput
          label="Pick your amount"
          hideControls
          allowNegative={false}
          {...form.getInputProps("value")}
        />
        <CustomDropdownInput
          onConfirm={onSelectHandler}
          target="peer"
          placeHolder="Pick your currency"
          label="Pick your currency"
          data={mockData}
        />
        <CustomDropdownInput
          onConfirm={onSelectHandler}
          target="target"
          placeHolder="Pick the target currency"
          label="Pick the target currency"
          data={mockData}
        />

        <Button onClick={calculateHandler}>Calculate</Button>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        title="Compare Result"
        centered
      ></Modal>
    </Flex>
  );
};

export default Question2;
