import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { reInitMenu } from '../helpers'
import { Content } from './components/content'
import { HeaderWrapper } from './components/header'
import { Sidebar } from './components/sidebar'

const MasterLayout = () => {
    const location = useLocation()
    useEffect(() => {
        reInitMenu()
    }, [location.key])

    return (
        <>
            <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
                <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
                    <HeaderWrapper />
                    <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
                        <Sidebar />
                        <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                            <div className='d-flex flex-column flex-column-fluid'>
                                <Content>
                                    <Outlet />
                                </Content>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export { MasterLayout }
