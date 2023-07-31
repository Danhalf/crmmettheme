import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { Dashboard } from './components/dashboard/Dashboard'
import Users from './components/dashboard/Users'
import { Billing } from 'components/dashboard/Billing'
import { Reports } from 'components/dashboard/Reports'

const App: React.FC = () => {
    return (
        <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path='' element={<Users />} />
                    <Route path='/dashboard/billing' element={<Billing />} />
                    <Route path='/dashboard/reports' element={<Reports />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
