import { Link } from 'react-router-dom'
import { MutableRefObject } from 'react'
type PropsType = {
    sidebarRef: MutableRefObject<HTMLDivElement | null>
}

export const SidebarLogo = (props: PropsType) => {
    return (
        <div className='app-sidebar-logo px-6 h1' id='kt_app_sidebar_logo'>
            <Link to='/dashboard'>ADMS CRM</Link>
        </div>
    )
}
