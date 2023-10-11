import { STORAGE_USER } from 'app-consts';
import { Login } from 'components/Login';
import { Dashboard } from 'components/dashboard/Dashboard';
import { LoginResponse } from 'services/auth.service';

export const PrivateRoute = () => {
    const userStorage = localStorage.getItem(STORAGE_USER);
    const { useruid }: LoginResponse = userStorage ? JSON.parse(userStorage) : {};

    return useruid ? <Dashboard /> : <Login />;
};
