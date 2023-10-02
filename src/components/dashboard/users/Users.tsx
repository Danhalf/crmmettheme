/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomModal } from 'components/dashboard/helpers/modal/renderModalHelper';
import { UserModal } from 'components/dashboard/users/UserModal/parts/UserModal';
import { UserPermissionsModal } from 'components/dashboard/users/UserModal/parts/UserPermissionsModal';
import { UserSettingsModal } from 'components/dashboard/users/UserModal/parts/UserSettingsModal';
import { UserOptionalModal } from 'components/dashboard/users/UserModal/parts/UserOptionalModal';
import { TableHead } from 'components/dashboard/helpers/renderTableHelper';
import { CustomDropdown } from 'components/dashboard/helpers/renderDropdownHelper';
import { User, getUsers, copyUser, deleteUser, killSession, Status } from 'services/user.service';
import { useToast } from '../helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { UserConfirmModal } from './UserModal/parts/UserConfirmModal';
import { PrimaryButton } from '../smallComponents/buttons/PrimaryButton';

enum UsersColumns {
    ID = 'Index',
    Username = 'User name',
    ParrentUser = 'Created by user',
    isadmin = 'Is admin',
    Actions = 'Actions',
}

const usersColumnsArray: string[] = Object.values(UsersColumns) as string[];

export default function Users() {
    const { useruid: currentUseruid } = JSON.parse(localStorage.getItem('admss-admin-user') ?? '');
    const [users, setUsers] = useState<User[]>([]);
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);
    const [editUserModalEnabled, setEditUserModalEnabled] = useState<boolean>(false);
    const [confirmModalEnabled, setConfirmModalEnabled] = useState<boolean>(false);
    const [userPermissionsModalEnabled, setUserPermissionsModalEnabled] = useState<boolean>(false);
    const [userSettingsModalEnabled, setUserSettingssModalEnabled] = useState<boolean>(false);
    const [userOptionalModalEnabled, setUserOptionalsModalEnabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const { handleShowToast } = useToast();

    const initialUserState = {
        created: '',
        createdbyuid: '',
        index: 0,
        parentuid: '',
        parentusername: '',
        updated: '',
        username: '',
        useruid: '',
        isadmin: 0,
    };

    const [selectedUser, setSelectedUser] = useState<User>(initialUserState);

    const [loaded, setLoaded] = useState<boolean>(false);

    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);
    const handleEditUserModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setEditUserModalEnabled(true);
    };
    const handleConfirmModalOpen = ({ useruid, username }: User) => {
        setSelectedUser({ ...selectedUser, useruid, username: username });
        setConfirmModalEnabled(true);
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
            if (response.length) {
                const filteredUsers = response.filter((user) => user?.useruid !== currentUseruid);
                setUsers(filteredUsers);
                setLoaded(true);
            }
        });
    };

    useEffect(() => {
        if (!loaded) {
            updateUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, loaded]);

    const handleCopyUser = async (useruid: string, username: string): Promise<void> => {
        setLoaded(false);
        try {
            if (useruid) {
                const response: any = await copyUser(useruid);
                if (response.status === 'OK') {
                    const newUseruid = response.useruid;
                    navigate(`user/${newUseruid}`);
                    handleShowToast({
                        message: `<strong>${username}</strong> successfully copied`,
                        type: 'success',
                    });
                    updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const handleMoveToTrash = async (userId: string, username: string): Promise<void> => {
        try {
            if (userId) {
                const response = await deleteUser(userId);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> successfully deleted`,
                        type: 'success',
                    });
                    setConfirmModalEnabled(false);
                    updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        } finally {
            setLoaded(false);
        }
    };

    const handleKillSession = async (useruid: string, username: string): Promise<void> => {
        setLoaded(false);
        try {
            if (useruid) {
                const response = await killSession(useruid);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> session successfully closed`,
                        type: 'success',
                    });
                    updateUsers();
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    return (
        <>
            {addUserModalEnabled && (
                <CustomModal onClose={handleAddUserModalOpen} title={'Add user'}>
                    <UserModal onClose={handleAddUserModalOpen} updateData={updateUsers} />
                </CustomModal>
            )}
            {confirmModalEnabled && (
                <CustomModal
                    onClose={() => setConfirmModalEnabled(false)}
                    title={'Confirm user delete'}
                    footerAction={() =>
                        handleMoveToTrash(selectedUser.useruid, selectedUser.username)
                    }
                >
                    <UserConfirmModal username={selectedUser.username} />
                </CustomModal>
            )}
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
                        username={selectedUser.username}
                        onUpdateUsers={updateUsers}
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
                        username={selectedUser.username}
                    />
                </CustomModal>
            )}
            {userOptionalModalEnabled && (
                <CustomModal
                    onClose={() => setUserOptionalsModalEnabled(false)}
                    title={`${selectedUser.username} user optional data: `}
                >
                    <UserOptionalModal
                        onClose={() => setUserOptionalsModalEnabled(false)}
                        useruid={selectedUser.useruid}
                        username={selectedUser.username}
                    />
                </CustomModal>
            )}
            <div className='card'>
                <div className='tab-content' id='myTabContentInner'>
                    <div className='d-flex w-100 justify-content-end px-8 mt-4'>
                        <PrimaryButton
                            buttonText='Add User'
                            icon='plus'
                            buttonClickAction={handleAddUserModalOpen}
                        />
                    </div>
                    <div className='card-body'>
                        {Array.isArray(users) ? (
                            <div className='table-responsive'>
                                <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                                    <TableHead columns={usersColumnsArray} />
                                    <tbody className='text-gray-600 fw-bold'>
                                        {users.map((user: User, index: number): JSX.Element => {
                                            return user?.useruid ? (
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
                                                    <td>{user.isadmin ? 'yes' : 'no'}</td>
                                                    <td>
                                                        <CustomDropdown
                                                            title='Actions'
                                                            items={[
                                                                {
                                                                    menuItemName: 'Change password',
                                                                    menuItemAction: () =>
                                                                        handleEditUserModalOpen(
                                                                            user
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName: 'Copy user',
                                                                    menuItemAction: () =>
                                                                        handleCopyUser(
                                                                            user.useruid,
                                                                            user.username
                                                                        ),
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
                                                                    menuItemName:
                                                                        'Set user settings',
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
                                                                        handleConfirmModalOpen(
                                                                            user
                                                                        ),
                                                                },
                                                                {
                                                                    menuItemName:
                                                                        'Kill user session',
                                                                    menuItemAction: () =>
                                                                        handleKillSession(
                                                                            user.useruid,
                                                                            user.username
                                                                        ),
                                                                },
                                                            ]}
                                                        />
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={index}>
                                                    <td>
                                                        <div
                                                            className='alert alert-danger fs-6 w-100'
                                                            role='alert'
                                                        >
                                                            <div className='bold'>Error: </div>
                                                            <span>
                                                                {JSON.parse(JSON.stringify(users))
                                                                    ?.error ||
                                                                    'Incorrect type of data received from the server'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className='alert alert-danger fs-6' role='alert'>
                                <div className='bold'>Error: </div>
                                <span>
                                    {JSON.parse(JSON.stringify(users))?.error ||
                                        'Incorrect type of data received from the server'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
