import { Currency as CurrencyType } from '../types/Expense';

type CurrencyInfo = {
    symbol: string,
    name: string
}

export const Currency: { [key in CurrencyType]: CurrencyInfo; } = {
    "ALL": {
        symbol: "Lek",
        name: "Albania Lek"
    },
    "AFN": {
        symbol: "؋",
        name: "Afghanistan Afghani"
    },
    "ARS": {
        symbol: "$",
        name: "Argentina Peso"
    },
    "AWG": {
        symbol: "ƒ",
        name: "Aruba Guilder"
    },
    "AUD": {
        symbol: "$",
        name: "Australia Dollar"
    },
    "AZN": {
        symbol: "₼",
        name: "Azerbaijan Manat"
    },
    "BSD": {
        symbol: "$",
        name: "Bahamas Dollar"
    },
    "BBD": {
        symbol: "$",
        name: "Barbados Dollar"
    },
    "BYN": {
        symbol: "Br",
        name: "Belarus Ruble"
    },
    "BZD": {
        symbol: "BZ$",
        name: "Belize Dollar"
    },
    "BMD": {
        symbol: "$",
        name: "Bermuda Dollar"
    },
    "BOB": {
        symbol: "$b",
        name: "Bolivia Bolíviano"
    },
    "BAM": {
        symbol: "KM",
        name: "Bosnia and Herzegovina Convertible Mark"
    },
    "BWP": {
        symbol: "P",
        name: "Botswana Pula"
    },
    "BGN": {
        symbol: "лв",
        name: "Bulgaria Lev"
    },
    "BRL": {
        symbol: "R$",
        name: "Brazil Real"
    },
    "BND": {
        symbol: "$",
        name: "Brunei Darussalam Dollar"
    },
    "KHR": {
        symbol: "៛",
        name: "Cambodia Riel"
    },
    "CAD": {
        symbol: "$",
        name: "Canada Dollar"
    },
    "KYD": {
        symbol: "$",
        name: "Cayman Islands Dollar"
    },
    "CLP": {
        symbol: "$",
        name: "Chile Peso"
    },
    "CNY": {
        symbol: "¥",
        name: "China Yuan Renminbi"
    },
    "COP": {
        symbol: "$",
        name: "Colombia Peso"
    },
    "CRC": {
        symbol: "₡",
        name: "Costa Rica Colon"
    },
    "HRK": {
        symbol: "kn",
        name: "Croatia Kuna"
    },
    "CUP": {
        symbol: "₱",
        name: "Cuba Peso"
    },
    "CZK": {
        symbol: "Kč",
        name: "Czech Republic Koruna"
    },
    "DKK": {
        symbol: "kr",
        name: "Denmark Krone"
    },
    "DOP": {
        symbol: "RD$",
        name: "Dominican Republic Peso"
    },
    "XCD": {
        symbol: "$",
        name: "East Caribbean Dollar"
    },
    "EGP": {
        symbol: "£",
        name: "Egypt Pound"
    },
    "SVC": {
        symbol: "$",
        name: "El Salvador Colon"
    },
    "EUR": {
        symbol: "€",
        name: "Euro Member Countries"
    },
    "FKP": {
        symbol: "£",
        name: "Falkland Islands (Malvinas) Pound"
    },
    "FJD": {
        symbol: "$",
        name: "Fiji Dollar"
    },
    "GHS": {
        symbol: "¢",
        name: "Ghana Cedi"
    },
    "GIP": {
        symbol: "£",
        name: "Gibraltar Pound"
    },
    "GTQ": {
        symbol: "Q",
        name: "Guatemala Quetzal"
    },
    "GGP": {
        symbol: "£",
        name: "Guernsey Pound"
    },
    "GYD": {
        symbol: "$",
        name: "Guyana Dollar"
    },
    "HNL": {
        symbol: "L",
        name: "Honduras Lempira"
    },
    "HKD": {
        symbol: "$",
        name: "Hong Kong Dollar"
    },
    "HUF": {
        symbol: "Ft",
        name: "Hungary Forint"
    },
    "ISK": {
        symbol: "kr",
        name: "Iceland Krona"
    },
    "INR": {
        symbol: "",
        name: "India Rupee"
    },
    "IDR": {
        symbol: "Rp",
        name: "Indonesia Rupiah"
    },
    "IRR": {
        symbol: "﷼",
        name: "Iran Rial"
    },
    "IMP": {
        symbol: "£",
        name: "Isle of Man Pound"
    },
    "ILS": {
        symbol: "₪",
        name: "Israel Shekel"
    },
    "JMD": {
        symbol: "J$",
        name: "Jamaica Dollar"
    },
    "JPY": {
        symbol: "¥",
        name: "Japan Yen"
    },
    "JEP": {
        symbol: "£",
        name: "Jersey Pound"
    },
    "KZT": {
        symbol: "лв",
        name: "Kazakhstan Tenge"
    },
    "KPW": {
        symbol: "₩",
        name: "Korea (North) Won"
    },
    "KRW": {
        symbol: "₩",
        name: "Korea (South) Won"
    },
    "KGS": {
        symbol: "лв",
        name: "Kyrgyzstan Som"
    },
    "LAK": {
        symbol: "₭",
        name: "Laos Kip"
    },
    "LBP": {
        symbol: "£",
        name: "Lebanon Pound"
    },
    "LRD": {
        symbol: "$",
        name: "Liberia Dollar"
    },
    "MKD": {
        symbol: "ден",
        name: "Macedonia Denar"
    },
    "MYR": {
        symbol: "RM",
        name: "Malaysia Ringgit"
    },
    "MUR": {
        symbol: "₨",
        name: "Mauritius Rupee"
    },
    "MXN": {
        symbol: "$",
        name: "Mexico Peso"
    },
    "MNT": {
        symbol: "₮",
        name: "Mongolia Tughrik"
    },
    "MZN": {
        symbol: "MT",
        name: "Mozambique Metical"
    },
    "NAD": {
        symbol: "$",
        name: "Namibia Dollar"
    },
    "NPR": {
        symbol: "₨",
        name: "Nepal Rupee"
    },
    "ANG": {
        symbol: "ƒ",
        name: "Netherlands Antilles Guilder"
    },
    "NZD": {
        symbol: "$",
        name: "New Zealand Dollar"
    },
    "NIO": {
        symbol: "C$",
        name: "Nicaragua Cordoba"
    },
    "NGN": {
        symbol: "₦",
        name: "Nigeria Naira"
    },
    "NOK": {
        symbol: "kr",
        name: "Norway Krone"
    },
    "OMR": {
        symbol: "﷼",
        name: "Oman Rial"
    },
    "PKR": {
        symbol: "₨",
        name: "Pakistan Rupee"
    },
    "PAB": {
        symbol: "B/.",
        name: "Panama Balboa"
    },
    "PYG": {
        symbol: "Gs",
        name: "Paraguay Guarani"
    },
    "PEN": {
        symbol: "S/.",
        name: "Peru Sol"
    },
    "PHP": {
        symbol: "₱",
        name: "Philippines Peso"
    },
    "PLN": {
        symbol: "zł",
        name: "Poland Zloty"
    },
    "QAR": {
        symbol: "﷼",
        name: "Qatar Riyal"
    },
    "RON": {
        symbol: "lei",
        name: "Romania Leu"
    },
    "RUB": {
        symbol: "₽",
        name: "Russia Ruble"
    },
    "SHP": {
        symbol: "£",
        name: "Saint Helena Pound"
    },
    "SAR": {
        symbol: "﷼",
        name: "Saudi Arabia Riyal"
    },
    "RSD": {
        symbol: "Дин.",
        name: "Serbia Dinar"
    },
    "SCR": {
        symbol: "₨",
        name: "Seychelles Rupee"
    },
    "SGD": {
        symbol: "$",
        name: "Singapore Dollar"
    },
    "SBD": {
        symbol: "$",
        name: "Solomon Islands Dollar"
    },
    "SOS": {
        symbol: "S",
        name: "Somalia Shilling"
    },
    "ZAR": {
        symbol: "R",
        name: "South Africa Rand"
    },
    "LKR": {
        symbol: "₨",
        name: "Sri Lanka Rupee"
    },
    "SEK": {
        symbol: "kr",
        name: "Sweden Krona"
    },
    "CHF": {
        symbol: "CHF",
        name: "Switzerland Franc"
    },
    "SRD": {
        symbol: "$",
        name: "Suriname Dollar"
    },
    "SYP": {
        symbol: "£",
        name: "Syria Pound"
    },
    "TWD": {
        symbol: "NT$",
        name: "Taiwan New Dollar"
    },
    "THB": {
        symbol: "฿",
        name: "Thailand Baht"
    },
    "TTD": {
        symbol: "TT$",
        name: "Trinidad and Tobago Dollar"
    },
    "TRY": {
        symbol: "",
        name: "Turkey Lira"
    },
    "TVD": {
        symbol: "$",
        name: "Tuvalu Dollar"
    },
    "UAH": {
        symbol: "₴",
        name: "Ukraine Hryvnia"
    },
    "GBP": {
        symbol: "£",
        name: "United Kingdom Pound"
    },
    "USD": {
        symbol: "$",
        name: "United States Dollar"
    },
    "UYU": {
        symbol: "$U",
        name: "Uruguay Peso"
    },
    "UZS": {
        symbol: "лв",
        name: "Uzbekistan Som"
    },
    "VEF": {
        symbol: "Bs",
        name: "Venezuela Bolívar"
    },
    "VND": {
        symbol: "₫",
        name: "Viet Nam Dong"
    },
    "YER": {
        symbol: "﷼",
        name: "Yemen Rial"
    },
    "ZWD": {
        symbol: "Z$",
        name: "Zimbabwe Dollar"
    }
};