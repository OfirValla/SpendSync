import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ref, query, get, limitToLast, endBefore, orderByKey } from 'firebase/database';

import { db } from '../../../firebase';

type Activity = {
    title: string;
    amount: number;
    currency: string;
    createdAt: string;
    paidBy: string;
    split: { [key: string]: number; };
};

const ViewGroup: FC = () => {
    const { groupId } = useParams();

    useEffect(() => {
        get(query(ref(db, `groups/${groupId}/activity`), orderByKey(), endBefore('-NrdHaDPwiL4Mj1hv-HM'), limitToLast(3))).then(res => {
            const data = res.val()
            console.log(res, data);
        })
            
    }, [])
    
    return (
        <div>View Group {groupId}</div>
    )
};

export default ViewGroup;