import { ActivityDTO } from './Activity';

export type GroupPreview = {
    id: string | null;
    name: string;
    owed: { [key: string]: number; };
};

export type Group = {
    activity: { [key: string]: ActivityDTO; }
    managedBy: string;
    members: { [key: string]: boolean; };
    name: string;
    owed: { [key: string]: number; };
};