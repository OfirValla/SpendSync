import { ExpenseDTO, Currency } from './Expense';

export type GroupBase = {
    id: string | null;
    lastUpdate: number;
}

export type GroupPreview = GroupBase & {
    name: string;
    owed: { [key: string]: number; };
    members: string[];
};

type OwedInformation = { [key in Currency]: number; };

export type Group = {
    activity: { [key: string]: ExpenseDTO; }
    managedBy: string;
    members: { [key: string]: boolean; };
    name: string;
    owed: { [key: string]: OwedInformation; };
};