export type Icons = 'house' | 'groceries' | 'dining-out' | 'household-supplies' | 'transportation' | 'subscriptions' |
    'events' | 'utility-bills' | 'health-wellness' | 'cleaning-services' | 'home-repairs' | 'furniture' |
    'pets' | 'vacations' | 'misc' | 'emergency' | 'gifts' | 'electronics' | 'education';

export type Currency = 'Lek' | '؋' | '$' | 'ƒ' | '$' | '₼' | '$' | '$' | 'Br' | 'BZ$' | '$' | '$b' | 'KM' | 'P' | 'лв' | 'R$' | '$' | '៛' | '$' | '$' | '$' | '¥' | '$' | '₡' | 'kn' | '₱' | 'Kč' | 'kr' | 'RD$' | '$' | '£' | '$' | '€' | '£' | '$' | '¢' | '£' | 'Q' | '£' | '$' | 'L' | '$' | 'Ft' | 'kr' | '' | 'Rp' | '﷼' | '£' | '₪' | 'J$' | '¥' | '£' | 'лв' | '₩' | '₩' | 'лв' | '₭' | '£' | '$' | 'ден' | 'RM' | '₨' | '$' | '₮' | 'MT' | '$' | '₨' | 'ƒ' | '$' | 'C$' | '₦' | 'kr' | '﷼' | '₨' | 'B/.' | 'Gs' | 'S/.' | '₱' | 'zł' | '﷼' | 'lei' | '₽' | '£' | '﷼' | 'Дин.' | '₨' | '$' | '$' | 'S' | 'R' | '₨' | 'kr' | 'CHF' | '$' | '£' | 'NT$' | '฿' | 'TT$' | '' | '$' | '₴' | '£' | '$' | '$U' | 'лв' | 'Bs' | '₫' | '﷼' | 'Z$'

export type ActivityDTO = {
    title: string;
    icon: Icons;
    amount: number;
    createdAt: number;
    currency: Currency;
    paidBy: string;
    split: { [key: string]: number; };
}

export type Activity = ActivityDTO & {
    id: string | null;   
};