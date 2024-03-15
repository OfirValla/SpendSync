import { FC } from 'react';
import { Expense as ExpenseType } from '../../../types/Activity';
import { Currency } from '../../../utils/Currency';

const Expense: FC<ExpenseType> = ({ id, title, amount, currency, createdAt, paidBy, split }) => {
    return (
        <div>
            <b>{id}</b> - {title} - {amount}{Currency[currency].symbol} - {createdAt} - {paidBy} - {JSON.stringify(split)}
        </div>
    );
};

export default Expense;