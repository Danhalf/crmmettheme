import { useLocalStorage } from '_metronic/helpers/crud-helper/helpers'
import { FC } from 'react'

const HeaderUserMenu: FC = () => {
    const [, , removeUserId] = useLocalStorage('userId', null)
    const userLogout = (): void => {
        removeUserId()
    }
    return (
        <div
            className='menu-sub-dropdown menu-column fw-bold py-4 fs-6 w-275px'
            data-kt-menu='true'
        >
            <div className='menu-item px-5'>
                <a onClick={userLogout} className='menu-link px-5'>
                    Sign Out
                </a>
            </div>
        </div>
    )
}

export { HeaderUserMenu }
