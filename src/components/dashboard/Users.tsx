import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User, deleteUser, getUsers } from 'services/user.service'

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (!loaded) {
            getUsers().then((response) => {
                setUsers(response)
                setLoaded(true)
            })
        }
    }, [users, loaded])

    const moveToTrash = (userId: string) => {
        deleteUser(userId).then((response) => {
            if (response.status === 'OK') {
                getUsers().then((response) => {
                    setUsers(response)
                    setLoaded(true)
                })
            }
        })
    }

    return (
        <div className='mb-10'>
            <h1 className='mb-5'>Users</h1>
            <div className='card'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        <table
                            id='kt_table_users'
                            className='table align-middle table-row-dashed fs-6 gy-5 no-footer'
                        >
                            <thead>
                                <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                                    <th>User name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-gray-600 fw-bold'>
                                {users.map((user) => {
                                    return (
                                        <tr key={user.useruid}>
                                            <td>
                                                <Link
                                                    to={`user/${user.useruid}`}
                                                    className='text-gray-800 text-hover-primary mb-1'
                                                >
                                                    {user.username}
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => moveToTrash(user.useruid)}
                                                >
                                                    Delete user
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
