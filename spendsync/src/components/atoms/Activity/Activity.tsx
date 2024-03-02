import { FC } from 'react';
import { Activity as ActivityType } from '../../../types/Activity';

const Activity: FC<ActivityType> = ({ id, title, amount, currency, createdAt, paidBy, split }) => {
    
    return (
        <div>
            <b>{id}</b> - {title} - {amount} {currency} - {createdAt} - {paidBy} - {JSON.stringify(split)}
        </div>
    );
};

export default Activity;