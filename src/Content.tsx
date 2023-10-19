import { Billing } from 'components/dashboard/Billing';
import { Reports } from 'components/dashboard/Reports';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { UserCard } from './components/dashboard/users/UserCard';
import { Users } from './components/dashboard/users/Users';
import { MenuComponent } from '_metronic/assets/ts/components/MenuComponent';
import { useAuthInterceptor } from 'services/auth.interceptor';
import { PrivateRoute } from 'router/privateRouter';

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

const Content = () => {
    useAuthInterceptor();
    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
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
        </div>
    );
};

export default Content;
