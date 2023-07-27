import { MasterInit } from '_metronic/layout/MasterInit'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
    useEffect(() => {
        document.getElementById('splash-screen')?.remove()
    }, [])

    return (
        <>
            <Outlet />
            <MasterInit />
        </>
    )
}

export { App }
