import { ExpenseDTO, Currency } from './Expense';

export type GroupId = { id: string | null; };

export type GroupBase = {
    lastUpdate: number;
    hasUpdate: boolean
}

export type GroupInitialData = GroupId & GroupBase;

export type GroupPreview = GroupInitialData & {
    name: string;
    owed: { [key: string]: number; };
};

export type OwedInformation = { [key in Currency]?: number; };

export type Owed = { [key: string]: OwedInformation; };

export type Group = {
    activity: { [key: string]: ExpenseDTO; }
    managedBy: string;
    members: { [key: string]: boolean; };
    name: string;
    owed: Owed;
};