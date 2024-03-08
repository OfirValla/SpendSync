export type Icons = 'house' | 'groceries' | 'dining-out' | 'household-supplies' | 'transportation' | 'subscriptions' | 'events' | 'utility-bills' | 'health-wellness' |
                    'cleaning-services' | 'home-repairs' | 'furniture' | 'pets' | 'vacations' | 'misc' | 'emergency' | 'gifts' | 'electronics' | 'education';

export type Currency =
    'ALL' | 'AFN' | 'ARS' | 'AWG' | 'AUD' | 'AZN' | 'BSD' | 'BBD' | 'BYN' | 'BZD' | 'BMD' |
    'BOB' | 'BAM' | 'BWP' | 'BGN' | 'BRL' | 'BND' | 'KHR' | 'CAD' | 'KYD' | 'CLP' | 'CNY' |
    'COP' | 'CRC' | 'HRK' | 'CUP' | 'CZK' | 'DKK' | 'DOP' | 'XCD' | 'EGP' | 'SVC' | 'EUR' |
    'FKP' | 'FJD' | 'GHS' | 'GIP' | 'GTQ' | 'GGP' | 'GYD' | 'HNL' | 'HKD' | 'HUF' | 'ISK' |
    'INR' | 'IDR' | 'IRR' | 'IMP' | 'ILS' | 'JMD' | 'JPY' | 'JEP' | 'KZT' | 'KPW' | 'KRW' |
    'KGS' | 'LAK' | 'LBP' | 'LRD' | 'MKD' | 'MYR' | 'MUR' | 'MXN' | 'MNT' | 'MZN' | 'NAD' |
    'NPR' | 'ANG' | 'NZD' | 'NIO' | 'NGN' | 'NOK' | 'OMR' | 'PKR' | 'PAB' | 'PYG' | 'PEN' |
    'PHP' | 'PLN' | 'QAR' | 'RON' | 'RUB' | 'SHP' | 'SAR' | 'RSD' | 'SCR' | 'SGD' | 'SBD' |
    'SOS' | 'ZAR' | 'LKR' | 'SEK' | 'CHF' | 'SRD' | 'SYP' | 'TWD' | 'THB' | 'TTD' | 'TRY' |
    'TVD' | 'UAH' | 'GBP' | 'USD' | 'UYU' | 'UZS' | 'VEF' | 'VND' | 'YER' | 'ZWD';

export type ActivityDTO = {
    title: string;
    icon: Icons;
    amount: number;
    createdAt: number;
    currency: Currency;
    paidBy: string;
    split: { [key: string]: number; };
};

export type Activity = ActivityDTO & {
    id: string | null;   
};