import clsx from 'clsx'
import { ITabValues } from '../interfaces/interfaces'
import { CustomCheckbox } from './renderInputsHelper'
import { renderTable } from './renderTableHelper'

const renderList = (data: any, checkbox: boolean = false) => {
    if (typeof data !== 'object' || data === null) {
        return (
            <div>
                <span className='text-muted d-block fw-semibold mb-6'>{data}</span>
            </div>
        )
    }

    const properties = Object.entries(data)

    return properties.map(([key, value]: [string, any], index: number) => {
        const title = key.replace(/^[^a-zа-яё]*([a-zа-яё])/i, (letter: string) =>
            letter.toUpperCase()
        )

        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                return <div key={`${key}-${index}`}>{renderTable(value)}</div>
            }
            return <div key={`${key}-${index}`}>{renderList(value)}</div>
        } else {
            const activeCheckbox = checkbox && (Number(value) === 0 || Number(value) === 1)
            return activeCheckbox ? (
                <CustomCheckbox
                    key={`${key}-${index}`}
                    currentValue={value}
                    id={key}
                    title={title}
                />
            ) : (
                <div key={`${key}-${index}`} className='d-flex align-items-center mb-4'>
                    <div className='flex-grow-1'>
                        <span className='text-dark fw-bold  fs-6'>{title}:</span>
                        <span className='text-muted d-block fw-semibold'>{value}</span>
                    </div>
                </div>
            )
        }
    })
}

export const TabNavigate = ({
    activeTab,
    tab,
    onTabClick,
}: {
    activeTab: string
    tab: string
    onTabClick: (tab: string) => void
}) => (
    <li className='nav-item'>
        <button
            className={clsx(`nav-link text-active-primary cursor-pointer`, {
                active: activeTab === tab,
            })}
            onClick={() => onTabClick(tab)}
            role='tab'
        >
            {tab}
        </button>
    </li>
)

export const TabPanel = ({ activeTab, tabName, children, tabId }: ITabValues) => (
    <div
        className={clsx('tab-pane vw-90 mx-auto', {
            active: activeTab === tabName,
        })}
        role='tabpanel'
        id={tabId ? `kt_tab_pane_${tabId}` : undefined}
    >
        {children}
    </div>
)

export const TabDataWrapper = ({
    data,
    checkbox = false,
}: {
    data: string
    checkbox?: boolean
}) => {
    if (!data) return <></>
    const parsedData = JSON.parse(data)
    const renderContent = () => {
        if (typeof parsedData === 'object' && !Array.isArray(parsedData)) {
            return renderList(parsedData, checkbox)
        } else {
            return renderTable(parsedData)
        }
    }

    return (
        <>
            <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
                <div className='col-12'>
                    <div className='card card-custom mb-5 vw-90 mx-auto'>
                        <div className='card-body'>
                            {parsedData ? renderContent() : 'No data available!!!'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
