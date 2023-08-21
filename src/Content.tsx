import { Billing } from 'components/dashboard/Billing'
import { Reports } from 'components/dashboard/Reports'
import { UserCard } from 'components/dashboard/UserCard'
import Users from 'components/dashboard/Users'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/dashboard/Dashboard'
import { Login } from './components/Login'
import { MenuComponent } from './_metronic/assets/ts/components'

export function MasterInit() {
    const pluginsInitialization = () => {
        setTimeout(() => {
            MenuComponent.bootstrap()
        }, 1500)
    }

    useEffect(() => {
        pluginsInitialization()
    }, [])

    return <></>
}

const Content = () => (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
        <MasterInit />
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />}>
                <Route path='' element={<Users />} />
                <Route path='/dashboard/billing' element={<Billing />} />
                <Route path='/dashboard/reports' element={<Reports />} />
                <Route path='/dashboard/user/:id' element={<UserCard />} />
            </Route>
        </Routes>
    </div>
)

export default Content
