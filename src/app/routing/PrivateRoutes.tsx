import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {UsersWrapper} from '../pages/users/UsersWrapper'
import {ReportsWrapper} from '../pages/reports/ReportsWrapper'
import {BillingWrapper} from '../pages/billing/BillingWrapper'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='users' element={<UsersWrapper />} />
        <Route path='reports' element={<ReportsWrapper />} />
        <Route path='billing' element={<BillingWrapper />} />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
