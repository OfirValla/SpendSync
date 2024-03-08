import { Currency as CurrencyType } from '../types/Activity';

type CurrencyInfo = {
    name: string,
    code: string
}

export const Currency: { [key in CurrencyType]: CurrencyInfo; } = {
    "ALL": {
        "code": "Lek",
        "name": "Albania Lek"
    },
    "AFN": {
        "code": "؋",
        "name": "Afghanistan Afghani"
    },
    "ARS": {
        "code": "$",
        "name": "Argentina Peso"
    },
    "AWG": {
        "code": "ƒ",
        "name": "Aruba Guilder"
    },
    "AUD": {
        "code": "$",
        "name": "Australia Dollar"
    },
    "AZN": {
        "code": "₼",
        "name": "Azerbaijan Manat"
    },
    "BSD": {
        "code": "$",
        "name": "Bahamas Dollar"
    },
    "BBD": {
        "code": "$",
        "name": "Barbados Dollar"
    },
    "BYN": {
        "code": "Br",
        "name": "Belarus Ruble"
    },
    "BZD": {
        "code": "BZ$",
        "name": "Belize Dollar"
    },
    "BMD": {
        "code": "$",
        "name": "Bermuda Dollar"
    },
    "BOB": {
        "code": "$b",
        "name": "Bolivia Bolíviano"
    },
    "BAM": {
        "code": "KM",
        "name": "Bosnia and Herzegovina Convertible Mark"
    },
    "BWP": {
        "code": "P",
        "name": "Botswana Pula"
    },
    "BGN": {
        "code": "лв",
        "name": "Bulgaria Lev"
    },
    "BRL": {
        "code": "R$",
        "name": "Brazil Real"
    },
    "BND": {
        "code": "$",
        "name": "Brunei Darussalam Dollar"
    },
    "KHR": {
        "code": "៛",
        "name": "Cambodia Riel"
    },
    "CAD": {
        "code": "$",
        "name": "Canada Dollar"
    },
    "KYD": {
        "code": "$",
        "name": "Cayman Islands Dollar"
    },
    "CLP": {
        "code": "$",
        "name": "Chile Peso"
    },
    "CNY": {
        "code": "¥",
        "name": "China Yuan Renminbi"
    },
    "COP": {
        "code": "$",
        "name": "Colombia Peso"
    },
    "CRC": {
        "code": "₡",
        "name": "Costa Rica Colon"
    },
    "HRK": {
        "code": "kn",
        "name": "Croatia Kuna"
    },
    "CUP": {
        "code": "₱",
        "name": "Cuba Peso"
    },
    "CZK": {
        "code": "Kč",
        "name": "Czech Republic Koruna"
    },
    "DKK": {
        "code": "kr",
        "name": "Denmark Krone"
    },
    "DOP": {
        "code": "RD$",
        "name": "Dominican Republic Peso"
    },
    "XCD": {
        "code": "$",
        "name": "East Caribbean Dollar"
    },
    "EGP": {
        "code": "£",
        "name": "Egypt Pound"
    },
    "SVC": {
        "code": "$",
        "name": "El Salvador Colon"
    },
    "EUR": {
        "code": "€",
        "name": "Euro Member Countries"
    },
    "FKP": {
        "code": "£",
        "name": "Falkland Islands (Malvinas) Pound"
    },
    "FJD": {
        "code": "$",
        "name": "Fiji Dollar"
    },
    "GHS": {
        "code": "¢",
        "name": "Ghana Cedi"
    },
    "GIP": {
        "code": "£",
        "name": "Gibraltar Pound"
    },
    "GTQ": {
        "code": "Q",
        "name": "Guatemala Quetzal"
    },
    "GGP": {
        "code": "£",
        "name": "Guernsey Pound"
    },
    "GYD": {
        "code": "$",
        "name": "Guyana Dollar"
    },
    "HNL": {
        "code": "L",
        "name": "Honduras Lempira"
    },
    "HKD": {
        "code": "$",
        "name": "Hong Kong Dollar"
    },
    "HUF": {
        "code": "Ft",
        "name": "Hungary Forint"
    },
    "ISK": {
        "code": "kr",
        "name": "Iceland Krona"
    },
    "INR": {
        "code": "",
        "name": "India Rupee"
    },
    "IDR": {
        "code": "Rp",
        "name": "Indonesia Rupiah"
    },
    "IRR": {
        "code": "﷼",
        "name": "Iran Rial"
    },
    "IMP": {
        "code": "£",
        "name": "Isle of Man Pound"
    },
    "ILS": {
        "code": "₪",
        "name": "Israel Shekel"
    },
    "JMD": {
        "code": "J$",
        "name": "Jamaica Dollar"
    },
    "JPY": {
        "code": "¥",
        "name": "Japan Yen"
    },
    "JEP": {
        "code": "£",
        "name": "Jersey Pound"
    },
    "KZT": {
        "code": "лв",
        "name": "Kazakhstan Tenge"
    },
    "KPW": {
        "code": "₩",
        "name": "Korea (North) Won"
    },
    "KRW": {
        "code": "₩",
        "name": "Korea (South) Won"
    },
    "KGS": {
        "code": "лв",
        "name": "Kyrgyzstan Som"
    },
    "LAK": {
        "code": "₭",
        "name": "Laos Kip"
    },
    "LBP": {
        "code": "£",
        "name": "Lebanon Pound"
    },
    "LRD": {
        "code": "$",
        "name": "Liberia Dollar"
    },
    "MKD": {
        "code": "ден",
        "name": "Macedonia Denar"
    },
    "MYR": {
        "code": "RM",
        "name": "Malaysia Ringgit"
    },
    "MUR": {
        "code": "₨",
        "name": "Mauritius Rupee"
    },
    "MXN": {
        "code": "$",
        "name": "Mexico Peso"
    },
    "MNT": {
        "code": "₮",
        "name": "Mongolia Tughrik"
    },
    "MZN": {
        "code": "MT",
        "name": "Mozambique Metical"
    },
    "NAD": {
        "code": "$",
        "name": "Namibia Dollar"
    },
    "NPR": {
        "code": "₨",
        "name": "Nepal Rupee"
    },
    "ANG": {
        "code": "ƒ",
        "name": "Netherlands Antilles Guilder"
    },
    "NZD": {
        "code": "$",
        "name": "New Zealand Dollar"
    },
    "NIO": {
        "code": "C$",
        "name": "Nicaragua Cordoba"
    },
    "NGN": {
        "code": "₦",
        "name": "Nigeria Naira"
    },
    "NOK": {
        "code": "kr",
        "name": "Norway Krone"
    },
    "OMR": {
        "code": "﷼",
        "name": "Oman Rial"
    },
    "PKR": {
        "code": "₨",
        "name": "Pakistan Rupee"
    },
    "PAB": {
        "code": "B/.",
        "name": "Panama Balboa"
    },
    "PYG": {
        "code": "Gs",
        "name": "Paraguay Guarani"
    },
    "PEN": {
        "code": "S/.",
        "name": "Peru Sol"
    },
    "PHP": {
        "code": "₱",
        "name": "Philippines Peso"
    },
    "PLN": {
        "code": "zł",
        "name": "Poland Zloty"
    },
    "QAR": {
        "code": "﷼",
        "name": "Qatar Riyal"
    },
    "RON": {
        "code": "lei",
        "name": "Romania Leu"
    },
    "RUB": {
        "code": "₽",
        "name": "Russia Ruble"
    },
    "SHP": {
        "code": "£",
        "name": "Saint Helena Pound"
    },
    "SAR": {
        "code": "﷼",
        "name": "Saudi Arabia Riyal"
    },
    "RSD": {
        "code": "Дин.",
        "name": "Serbia Dinar"
    },
    "SCR": {
        "code": "₨",
        "name": "Seychelles Rupee"
    },
    "SGD": {
        "code": "$",
        "name": "Singapore Dollar"
    },
    "SBD": {
        "code": "$",
        "name": "Solomon Islands Dollar"
    },
    "SOS": {
        "code": "S",
        "name": "Somalia Shilling"
    },
    "ZAR": {
        "code": "R",
        "name": "South Africa Rand"
    },
    "LKR": {
        "code": "₨",
        "name": "Sri Lanka Rupee"
    },
    "SEK": {
        "code": "kr",
        "name": "Sweden Krona"
    },
    "CHF": {
        "code": "CHF",
        "name": "Switzerland Franc"
    },
    "SRD": {
        "code": "$",
        "name": "Suriname Dollar"
    },
    "SYP": {
        "code": "£",
        "name": "Syria Pound"
    },
    "TWD": {
        "code": "NT$",
        "name": "Taiwan New Dollar"
    },
    "THB": {
        "code": "฿",
        "name": "Thailand Baht"
    },
    "TTD": {
        "code": "TT$",
        "name": "Trinidad and Tobago Dollar"
    },
    "TRY": {
        "code": "",
        "name": "Turkey Lira"
    },
    "TVD": {
        "code": "$",
        "name": "Tuvalu Dollar"
    },
    "UAH": {
        "code": "₴",
        "name": "Ukraine Hryvnia"
    },
    "GBP": {
        "code": "£",
        "name": "United Kingdom Pound"
    },
    "USD": {
        "code": "$",
        "name": "United States Dollar"
    },
    "UYU": {
        "code": "$U",
        "name": "Uruguay Peso"
    },
    "UZS": {
        "code": "лв",
        "name": "Uzbekistan Som"
    },
    "VEF": {
        "code": "Bs",
        "name": "Venezuela Bolívar"
    },
    "VND": {
        "code": "₫",
        "name": "Viet Nam Dong"
    },
    "YER": {
        "code": "﷼",
        "name": "Yemen Rial"
    },
    "ZWD": {
        "code": "Z$",
        "name": "Zimbabwe Dollar"
    }
};