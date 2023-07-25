import { FC } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { App } from '../App'
import { AuthPage } from '../modules/auth'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { PrivateRoutes } from './PrivateRoutes'

const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {
    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <Routes>
                <Route element={<App />}>
                    <Route path='error/*' element={<ErrorsPage />} />
                    <Route path='/dashboard' element={<PrivateRoutes />} />
                    <Route path='/' element={<AuthPage />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }
