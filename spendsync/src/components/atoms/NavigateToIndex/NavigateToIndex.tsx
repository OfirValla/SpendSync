import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateToIndex: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, []);

    return <></>
};

export default NavigateToIndex;