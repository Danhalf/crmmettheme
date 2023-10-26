import { Link, useNavigate } from 'react-router-dom';
import { LoginResponse, logout } from 'services/auth.service';
import { CustomDropdown } from './helpers/renderDropdownHelper';
import { STORAGE_USER } from 'app-consts';
import { useState } from 'react';
import { CustomModal } from './helpers/modal/renderModalHelper';
import { UserModal } from './users/UserModal/parts/UserModal';

export function DashboardHeader() {
    const navigate = useNavigate();
    const userStorage = localStorage.getItem(STORAGE_USER);

    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const { useruid, loginname }: LoginResponse = userStorage ? JSON.parse(userStorage) : {};

    const handleUserCardOpen = () => {
        navigate(`/dashboard/user/${useruid}`);
    };

    const handleEditUserModalOpen = () => {
        setEditUserModalEnabled(true);
    };
    const signOut = () => {
        if (useruid) {
            logout(useruid).then((response) => {
                if (response.status) {
                    navigate('/');
                    localStorage.removeItem(STORAGE_USER);
                }
            });
        }
    };
    return (
        <div id='kt_app_header' className='app-header'>
            {editUserModalEnabled && (
                <CustomModal
                    onClose={() => setEditUserModalEnabled(false)}
                    title={'Change password'}
                >
                    <UserModal
                        onClose={() => setEditUserModalEnabled(false)}
                        user={{ username: loginname, useruid }}
                    />
                </CustomModal>
            )}
            <div className='container flex-lg-grow-1 d-flex align-items-stretch justify-content-between'>
                <div className='d-flex align-items-stretch justify-content-between flex-grow-1'>
                    <div className='app-header-menu d-flex align-items-stretch w-100'>
                        <div className='menu menu-rounded menu-column menu-row my-5 my-lg-0 align-items-stretch fw-semibold  px-lg-0 w-100'>
                            <div className='menu-item me-lg-1'>
                                <Link
                                    className='menu-link py-3 text-hover-primary'
                                    to={'/dashboard'}
                                >
                                    <i className='ki-outline ki-user-tick fs-2 m-2'></i>
                                    <span className='menu-title'>Users</span>
                                </Link>
                            </div>
                            <div className='menu-item me-lg-1'>
                                <Link
                                    className='menu-link py-3 text-hover-primary'
                                    to={'/dashboard/billing'}
                                >
                                    <i className='ki-outline ki-bill fs-2 m-2'></i>
                                    <span className='menu-title'>Billing</span>
                                </Link>
                            </div>
                            <div className='menu-item me-lg-1 flex-grow-1'>
                                <Link
                                    className='menu-link py-3 text-hover-primary'
                                    to={'/dashboard/reports'}
                                >
                                    <i className='ki-outline ki-notepad fs-2 m-2'></i>
                                    <span className='menu-title'>Reports</span>
                                </Link>
                            </div>
                            <div className='menu-item me-lg-1'>
                                <CustomDropdown
                                    title={loginname}
                                    weight={200}
                                    items={[
                                        {
                                            menuItemName: `${loginname} card`,
                                            icon: 'user-tick',
                                            menuItemAction: () => handleUserCardOpen(),
                                        },
                                        {
                                            menuItemName: 'Change password',
                                            icon: 'lock-2',
                                            menuItemAction: () => handleEditUserModalOpen(),
                                        },
                                        {
                                            menuItemName: 'Log out',
                                            icon: 'exit-right',
                                            menuItemAction: () => signOut(),
                                        },
                                    ]}
                                ></CustomDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
