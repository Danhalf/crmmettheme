import { FC, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { AuthPage } from '../modules/auth'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { PrivateRoutes } from './PrivateRoutes'
import { useAuth } from 'app/modules/auth/AuthContex'
import { useLocalStorage } from '_metronic/helpers/crud-helper/helpers'

const AppRoutes: FC = () => {
    const dashboard = '/dashboard'
    const [savedUser] = useLocalStorage('userId')

    const { userId } = useAuth()

    useEffect(() => {
        if (userId === null && !savedUser && window.location.pathname === dashboard) {
            window.location.href = '/'
        }
    }, [userId])

    return (
        <Routes>
            {!userId && !savedUser ? (
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
