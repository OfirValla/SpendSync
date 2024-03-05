import { FC } from 'react';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { NavLink } from 'react-router-dom';


const Landing: FC = () => {
    useDocumentTitle('SpendSync');

    return (
        <>
            <NavLink to="/sign-in">Sign In</NavLink> 
            <br />
            <NavLink to="/sign-up">Sign Up</NavLink> 
        </>
    );
};

export default Landing;