import { MasterLayout } from '_metronic/layout/MasterLayout'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BillingWrapper } from '../pages/billing/BillingWrapper'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { ReportsWrapper } from '../pages/reports/ReportsWrapper'
import { UsersWrapper } from '../pages/users/UsersWrapper'

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                <Route path='/*' element={<Navigate to='/dashboard' />} />
                <Route path='dashboard' element={<DashboardWrapper />} />
                <Route path='users' element={<UsersWrapper />} />
                <Route path='reports' element={<ReportsWrapper />} />
                <Route path='billing' element={<BillingWrapper />} />
                <Route path='*' element={<Navigate to='/error/404' />} />
            </Route>
        </Routes>
    )
}

export { PrivateRoutes }
