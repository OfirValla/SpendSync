import { FC } from 'react';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';


const ResetPassword: FC = () => {
    useDocumentTitle('SpendSync - Reset Password');

    
    return (
        <>
            <div>Reset Password</div>  
        </>
    );
};

export default ResetPassword;