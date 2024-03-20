import { FC } from 'react';
import { Expense as ExpenseType } from '../../../types/Expense';
import { Currency } from '../../../utils/Currency';

const Expense: FC<ExpenseType> = ({ id, title, amount, currency, createdAt, paidBy, split }) => {
    return (
        <div style={{ backgroundColor: '#9d9d9d42', border: '1px solid white', borderRadius: '15px', padding: '10px' }}>
            <b>{id}</b> - {title} - {amount}{Currency[currency].symbol} - {`${new Date(createdAt).getDate()}/${new Date(createdAt).getMonth() + 1}/${new Date(createdAt).getFullYear()}`} - {paidBy} - {JSON.stringify(split)}
        </div>
    );
};

export default Expense;