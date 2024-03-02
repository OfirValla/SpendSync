export type Icons = 'house' | 'groceries' | 'dining-out' | 'household-supplies' | 'transportation' | 'subscriptions' |
    'events' | 'utility-bills' | 'health-wellness' | 'cleaning-services' | 'home-repairs' | 'fuurniture' |
    'pets' | 'vacations' | 'misc' | 'emergency' | 'gifts' | 'electronics' | 'education';

export type ActivityDTO = {
    title: string;
    icon: Icons;
    amount: number;
    createdAt: number;
    currency: string;
    paidBy: string;
    split: { [key: string]: number; };
}

export type Activity = ActivityDTO & {
    id: string | null;   
};