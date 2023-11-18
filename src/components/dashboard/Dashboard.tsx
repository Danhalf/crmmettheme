import { createContext, useContext } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { Outlet } from 'react-router-dom';
import { UserPermissions } from 'common/interfaces/UserData';

type UserPermissionsContext = {
    userPermissions: UserPermissions[];
};

export const UserContext = createContext<UserPermissionsContext>({
    userPermissions: [UserPermissions.USER],
});

export function Dashboard() {
    const { userPermissions } = useContext(UserContext);
    return (
        <UserContext.Provider value={{ userPermissions }}>
            <div className='d-flex flex-column flex-root app-root'>
                <div className='app-page flex-column flex-column-fluid'>
                    <DashboardHeader />
                    <div className='app-wrapper flex-column flex-row-fluid'>
                        <div className='app-main flex-column flex-row-fluid'>
                            <div className='d-flex flex-column flex-column-fluid'>
                                <div className='app-content flex-column-fluid py-3 py-lg-6'>
                                    <div className='container container-fluid'>
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    );
}
