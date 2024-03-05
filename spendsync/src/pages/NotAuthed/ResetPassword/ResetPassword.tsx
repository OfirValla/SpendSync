import { FC, useEffect } from 'react';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';
import { requestResetPassword } from '../../../firebase';


const ResetPassword: FC = () => {
    useDocumentTitle('SpendSync - Reset Password');

    useEffect(() => {
        console.log("sending")
    }, [])
    
    return (
        <>
            <div>Reset Password</div>  
        </>
    );
};

export default ResetPassword;