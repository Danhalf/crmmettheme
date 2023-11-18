import { Billing } from 'components/dashboard/Billing';
import { Reports } from 'components/dashboard/Reports';
import { createContext, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { UserCard } from './components/dashboard/users/UserCard';
import { Users } from './components/dashboard/users/Users';
import { MenuComponent } from '_metronic/assets/ts/components/MenuComponent';
import { useAuthInterceptor } from 'services/auth.interceptor';
import { PrivateRoute } from 'router/privateRouter';
import { UserPermissions } from 'common/interfaces/UserData';

export function MasterInit() {
    const pluginsInitialization = () => {
        setTimeout(() => {
            MenuComponent.bootstrap();
        }, 1500);
    };

    useEffect(() => {
        pluginsInitialization();
    }, []);

    return <></>;
}

type UserPermissionsContext = {
    userPermissions: UserPermissions[];
    setUserPermissions: (permissions: UserPermissions[]) => void;
};

export const UserContext = createContext<UserPermissionsContext>({
    userPermissions: [UserPermissions.USER],
    setUserPermissions: () => {},
});

const Content = () => {
    const { userPermissions, setUserPermissions } = useContext(UserContext);
    useAuthInterceptor();
    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
            <UserContext.Provider value={{ userPermissions, setUserPermissions }}>
                <MasterInit />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/dashboard' element={<PrivateRoute />}>
                        <Route path='' element={<Users />} />
                        <Route path='/dashboard/billing' element={<Billing />} />
                        <Route path='/dashboard/reports' element={<Reports />} />
                        <Route path='/dashboard/user/:id' element={<UserCard />} />
                    </Route>
                </Routes>
            </UserContext.Provider>
        </div>
    );
};

export default Content;
