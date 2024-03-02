import { FC } from 'react';

interface ActivityProps {
    id: string | null;
    title: string;
    amount: number;
    currency: string;
    createdAt: string;
    paidBy: string;
    split: { [key: string]: number; };
}

const Activity: FC<ActivityProps> = ({ id, title, amount, currency, createdAt, paidBy, split }) => {
    
    return (
        <div>
            <b>{id}</b> - {title} - {amount} {currency} - {createdAt} - {paidBy} - {JSON.stringify(split)}
        </div>
    );
};

export default Activity;