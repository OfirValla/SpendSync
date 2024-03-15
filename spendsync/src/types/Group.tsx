import { ExpenseDTO, Currency } from './Activity';

export type GroupPreview = {
    id: string | null;
    name: string;
    owed: { [key: string]: number; };
};

type OwedInformation = { [key in Currency]: number; };

export type Group = {
    activity: { [key: string]: ExpenseDTO; }
    managedBy: string;
    members: { [key: string]: boolean; };
    name: string;
    owed: { [key: string]: OwedInformation; };
};