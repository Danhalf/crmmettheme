import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers, User } from 'services/user.service';
import { CustomDropdown, TableHead } from './helpers/helpers';

// eslint-disable-next-line no-unused-vars
enum UsersColumns {
    // eslint-disable-next-line
    UserID = 'User ID',
    // eslint-disable-next-line
    Username = 'User name',
    // eslint-disable-next-line
    Actions = 'Actions',
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const usersColumnsArray: string[] = Object.values(UsersColumns) as string[];

    useEffect(() => {
        if (!loaded) {
            getUsers().then((response) => {
                setUsers(response);
                setLoaded(true);
            });
        }
    }, [users, loaded]);

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
        <div className='mb-10'>
            <div className='card'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table className='table align-middle table-row-dashed fs-6 gy-3 no-footer'>
                            <TableHead columns={usersColumnsArray} />
                            <tbody className='text-gray-600 fw-bold'>
                                {users.map((user) => {
                                    return (
                                        <tr key={user.useruid}>
                                            <td>{user.index}</td>
                                            <td>
                                                <Link
                                                    to={`user/${user.useruid}`}
                                                    className='text-gray-800 text-hover-primary mb-1 text-decoration-underline'
                                                >
                                                    {user.username}
                                                </Link>
                                            </td>
                                            <td>
                                                <CustomDropdown
                                                    title='Actions'
                                                    items={[
                                                        {
                                                            menuItemName: 'Delete user',
                                                            menuItemAction: () =>
                                                                moveToTrash(user.useruid),
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
    );
}
