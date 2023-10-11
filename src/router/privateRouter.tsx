import { Login } from 'components/Login';
import { Dashboard } from 'components/dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { checkToken } from 'services/auth.service';
import { getToken } from 'services/utils';

export const PrivateRoute = () => {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const token = getToken();
    useEffect(() => {
        checkToken(token)
            .then(() => {
                setIsTokenValid(true);
            })
            .catch(() => {
                setIsTokenValid(false);
            });
    }, [token]);

    return isTokenValid ? <Dashboard /> : <Login />;
};
