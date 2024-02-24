import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { db } from '../../../firebase';

const ViewGroup: FC = () => {
    const { groupId } = useParams();
    
    
    return (
        <div>View Group {groupId}</div>
    )
};

export default ViewGroup;