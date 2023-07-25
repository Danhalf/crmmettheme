import { MasterInit } from '_metronic/layout/MasterInit'
import { Outlet } from 'react-router-dom'

const App = () => {
    return (
        <>
            <Outlet />
            <MasterInit />
        </>
    )
}

export { App }
