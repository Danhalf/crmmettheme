import { STORAGE_USER } from 'app-consts';
import { Login } from 'components/Login';
import { Dashboard } from 'components/dashboard/Dashboard';
import { useEffect } from 'react';
import { LoginResponse, checkToken } from 'services/auth.service';
import { getToken } from 'services/utils';

export const PrivateRoute = () => {
    const userStorage = localStorage.getItem(STORAGE_USER);
    const { useruid }: LoginResponse = userStorage ? JSON.parse(userStorage) : {};
    const token = getToken();
    useEffect(() => {
        // eslint-disable-next-line no-console
        checkToken(token).then((r) => console.log(r));
    }, [token]);

    return useruid ? <Dashboard /> : <Login />;
};
