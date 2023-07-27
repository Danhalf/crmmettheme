import { Link } from 'react-router-dom'
import { MutableRefObject } from 'react'

type PropsType = {
    sidebarRef: MutableRefObject<HTMLDivElement | null>
}

export const SidebarLogo = (props: PropsType) => {
    return (
        <div className='app-sidebar-logo px-6 h1' id='kt_app_sidebar_logo'>
            <Link className='py-6' to='/dashboard'>
                <img className='w-100 h-50' src='./media/logos/logo.png' alt='AMDS CRM logo' />
            </Link>
        </div>
    )
}
