import { FC, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { AuthPage } from '../modules/auth'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { PrivateRoutes } from './PrivateRoutes'
import { useAuth } from 'app/modules/auth/AuthContex'

const AppRoutes: FC = () => {
    const dashboard = '/dashboard'

    const { userId } = useAuth()

    useEffect(() => {
        if (userId === null && window.location.pathname === dashboard) {
            window.location.href = '/'
        }
    }, [userId])

    return (
        <Routes>
            {!userId ? (
                <Route path='/' element={<AuthPage />} />
            ) : (
                <Route element={<App />}>
                    <Route path='error/*' element={<ErrorsPage />} />
                    <Route path={`${dashboard}/*`} element={<PrivateRoutes />} />
                    <Route path='*' element={<Navigate to={dashboard} />} />
                </Route>
            )}
        </Routes>
    )
}

export { AppRoutes }
