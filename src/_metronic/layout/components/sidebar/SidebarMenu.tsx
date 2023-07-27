import { Link } from 'react-router-dom'

export const SidebarMenu = () => {
    const dashboardUrl = '/dashboard'
    return (
        <ul className='menu-nav'>
            <li className='menu-item  menu-item-active menu-item-open menu-item-not-hightlighted'>
                <Link className='menu-link active' to={dashboardUrl}>
                    <span className='menu-text'>Dashboard</span>
                </Link>
                <Link className='menu-link active' to={`${dashboardUrl}/users`}>
                    <span className='menu-text'>Users</span>
                </Link>
                <Link className='menu-link active' to={`${dashboardUrl}/reports`}>
                    <span className='menu-text'>Reports</span>
                </Link>
                <Link className='menu-link active' to={`${dashboardUrl}/billing`}>
                    <span className='menu-text'>Billing</span>
                </Link>
            </li>
        </ul>
    )
}
