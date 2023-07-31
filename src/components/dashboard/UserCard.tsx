import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

export function UserCard() {
    const { id } = useParams()
    const [tab, setTab] = useState('Profile')

    useEffect(() => {
        if (id) {
        }
    }, [id])
    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>User Card</h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Profile',
                                    })}
                                    onClick={() => setTab('Profile')}
                                    role='tab'
                                >
                                    Profile
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Extended Info',
                                    })}
                                    onClick={() => setTab('Extended Info')}
                                    role='tab'
                                >
                                    Extended Info
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Extended Info',
                                    })}
                                    onClick={() => setTab('Short Info')}
                                    role='tab'
                                >
                                    Short Info
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Locations',
                                    })}
                                    onClick={() => setTab('Locations')}
                                    role='tab'
                                >
                                    Locations
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link text-active-primary cursor-pointer`, {
                                        active: tab === 'Permissions',
                                    })}
                                    onClick={() => setTab('Permissions')}
                                    role='tab'
                                >
                                    Permissions
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Settings',
                                    })}
                                    onClick={() => setTab('Settings')}
                                    role='tab'
                                >
                                    Settings
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Sessions',
                                    })}
                                    onClick={() => setTab('Sessions')}
                                    role='tab'
                                >
                                    Sessions
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Logins',
                                    })}
                                    onClick={() => setTab('Logins')}
                                    role='tab'
                                >
                                    Logins
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Subusers',
                                    })}
                                    onClick={() => setTab('Subusers')}
                                    role='tab'
                                >
                                    Subusers
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Sales persons',
                                    })}
                                    onClick={() => setTab('Sales persons')}
                                    role='tab'
                                >
                                    Sales persons
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Permissions',
                                    })}
                                    onClick={() => setTab('Permissions')}
                                    role='tab'
                                >
                                    Permissions
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a
                                    className={clsx(`nav-link cursor-pointer`, {
                                        active: tab === 'Permissions',
                                    })}
                                    onClick={() => setTab('User types')}
                                    role='tab'
                                >
                                    User types
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='card card-custom'>
                    <div className='card-body'></div>
                </div>
            </div>
        </div>
    )
}
