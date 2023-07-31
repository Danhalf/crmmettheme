import { useEffect, useState } from 'react'
import { listUsers, User } from '../../services/user.service'

export default function Users() {
    const [users, setUsers] = useState<User[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    useEffect(() => {
        if (!loaded) {
            listUsers().then((response) => {
                setUsers(response)
                setLoaded(true)
            })
        }
    }, [users, loaded])
    return (
        <>
            <h1 className='mb-5'>Users</h1>
            {users.map((user) => (
                <div className='card card-custom' key={user.useruid}>
                    <div className='card-header'>
                        <h3 className='card-title'>{user.username}</h3>
                    </div>
                    <ul className='card-body'>
                        <li>Index: {user.index}</li>
                        <li>Created: {user.created}</li>
                        <li>Updated: {user.updated}</li>
                        <li>User uid: {user.useruid}</li>
                        <li>Created by uid: {user.createdbyuid}</li>
                        <li>Parrent uid: {user.parentuid}</li>
                    </ul>
                </div>
            ))}
        </>
    )
}
