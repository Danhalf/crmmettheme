/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { UserModal } from 'components/dashboard/users/UserModal/parts/UserModal';
import { UserPermissionsModal } from 'components/dashboard/users/UserModal/parts/UserPermissionsModal';
import { UserSettingsModal } from 'components/dashboard/users/UserModal/parts/UserSettingsModal';
import { UserOptionalModal } from 'components/dashboard/users/UserModal/parts/UserOptionalModal';
import { TableHead } from 'components/dashboard/helpers/renderTableHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { User, getUsers, copyUser, deleteUser, killSession } from 'services/user.service';

enum UsersColumns {
    ID = 'Index',
    Username = 'User name',
    ParrentUser = 'Created by user',
    isAdmin = 'Is admin',
    Actions = 'Actions',
}

const usersColumnsArray: string[] = Object.values(UsersColumns) as string[];

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const [userPermissionsModalEnabled, setUserPermissionsModalEnabled] = useState<boolean>(false);
    const [userSettingsModalEnabled, setUserSettingssModalEnabled] = useState<boolean>(false);
    const [userOptionalModalEnabled, setUserOptionalsModalEnabled] = useState<boolean>(false);

    const initialUserState = {
        created: '',
        createdbyuid: '',
        index: 0,
        parentuid: '',
        parentusername: '',
        updated: '',
        username: '',
        useruid: '',
        isAdmin: 0,
    };

    const [selectedUser, setSelectedUser] = useState<User>(initialUserState);

    const [loaded, setLoaded] = useState<boolean>(false);

    const handleEditUserModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setEditUserModalEnabled(true);
    };
    const handleUserPermissonsModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setUserPermissionsModalEnabled(true);
    };
    const handleUserSettingsModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setUserSettingssModalEnabled(true);
    };
    const handleUserOptionalModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setUserOptionalsModalEnabled(true);
    };

    const updateUsers = (): void => {
        getUsers().then((response) => {
            setUsers(response);
            setLoaded(true);
        });
    };

    useEffect(() => {
        if (!loaded) {
            updateUsers();
        }
    }, [users, loaded]);

    const handleCopyUser = (srcuid: string) => {
        copyUser(srcuid).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response) => {
                    setUsers(response);
                    setLoaded(true);
                });
            }
        });
    };

    const moveToTrash = (userId: string) => {
        deleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response) => {
                    setUsers(response);
                    setLoaded(true);
                });
            }
        });
    };

    return (
        <>
            {editUserModalEnabled && (
                <CustomModal
                    onClose={() => setEditUserModalEnabled(false)}
                    title={'Change password'}
                >
                    <UserModal onClose={() => setEditUserModalEnabled(false)} user={selectedUser} />
                </CustomModal>
            )}
            {userPermissionsModalEnabled && (
                <CustomModal
                    onClose={() => setUserPermissionsModalEnabled(false)}
                    title={`${selectedUser.username} user permissions: `}
                >
                    <UserPermissionsModal
                        onClose={() => setUserPermissionsModalEnabled(false)}
                        useruid={selectedUser.useruid}
                    />
                </CustomModal>
            )}
            {userSettingsModalEnabled && (
                <CustomModal
                    onClose={() => setUserSettingssModalEnabled(false)}
                    title={`${selectedUser.username} user settings: `}
                >
                    <UserSettingsModal
                        onClose={() => setUserSettingssModalEnabled(false)}
                        useruid={selectedUser.useruid}
                    />
                </CustomModal>
            )}
            {userOptionalModalEnabled && (
                <CustomModal
                    onClose={() => setUserOptionalsModalEnabled(false)}
                    title={`${selectedUser.username} user settings: `}
                >
                    <UserOptionalModal
                        onClose={() => setUserOptionalsModalEnabled(false)}
                        useruid={selectedUser.useruid}
                    />
                </CustomModal>
            )}
            <div className='card'>
                <div className='tab-content' id='myTabContentInner'>
                    <div className='card-body'>
                        <div
                            className='d-flex justify-content-end'
                            data-kt-user-table-toolbar='base'
                        ></div>
                        <div className='table-responsive'>
                            <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                                <TableHead columns={usersColumnsArray} />
                                <tbody className='text-gray-600 fw-bold'>
                                    {users.map((user: User) => {
                                        return (
                                            <tr key={user.useruid}>
                                                <td className='text-gray-800'>{user.index}</td>
                                                <td>
                                                    <Link
                                                        to={`user/${user.useruid}`}
                                                        className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                    >
                                                        {user.username}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`user/${user.parentuid}`}
                                                        className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                    >
                                                        {user.parentusername}
                                                    </Link>
                                                </td>
                                                <td>{user.isAdmin ? 'yes' : 'no'}</td>
                                                <td>
                                                    <CustomDropdown
                                                        title='Actions'
                                                        items={[
                                                            {
                                                                menuItemName: 'Change password',
                                                                menuItemAction: () =>
                                                                    handleEditUserModalOpen(user),
                                                            },
                                                            {
                                                                menuItemName: 'Copy user',
                                                                menuItemAction: () =>
                                                                    handleCopyUser(user.useruid),
                                                            },
                                                            {
                                                                menuItemName:
                                                                    'Set user permissions',
                                                                menuItemAction: () =>
                                                                    handleUserPermissonsModalOpen(
                                                                        user
                                                                    ),
                                                            },
                                                            {
                                                                menuItemName: 'Set user settings',
                                                                menuItemAction: () =>
                                                                    handleUserSettingsModalOpen(
                                                                        user
                                                                    ),
                                                            },
                                                            {
                                                                menuItemName:
                                                                    'Set user optional data',
                                                                menuItemAction: () =>
                                                                    handleUserOptionalModalOpen(
                                                                        user
                                                                    ),
                                                            },
                                                            {
                                                                menuItemName: 'Delete user',
                                                                menuItemAction: () =>
                                                                    moveToTrash(user.useruid),
                                                            },
                                                            {
                                                                menuItemName: 'Kill user session',
                                                                menuItemAction: () =>
                                                                    killSession(user.useruid),
                                                            },
                                                        ]}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
