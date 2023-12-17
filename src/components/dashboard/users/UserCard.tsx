/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TabDataWrapper, TabNavigate, TabPanel } from 'components/dashboard/helpers/helpers';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import {
    Status,
    getUserExtendedInfo,
    getUserLocations,
    getUserPermissions,
    getUserProfile,
    getUserSettings,
    getUserShortInfo,
    listSalesPersons,
    listSubusers,
    listUserLogins,
    listUserSessions,
    setUserPermissions,
} from 'services/user.service';
import { AxiosError } from 'axios';
import { sortPermissions, filterObjectValues } from './data/permissions';
import { useToast } from '../helpers/renderToastHelper';

enum UserCardTabs {
    PROFILE = 'Profile',
    EXTENDEDINFO = 'Extended info',
    SHORTINFO = 'Short info',
    LOCATIONS = 'Locations',
    USERPERMISSIONS = 'User permissions',
    SETTINGS = 'Settings',
    SESSIONS = 'Sessions',
    LOGINS = 'Logins',
    SUBUSERS = 'Subusers',
    SALESPERSONS = 'Sales persons',
}

const userCardTabsArray: string[] = Object.values(UserCardTabs) as string[];

export function UserCard() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<string>(UserCardTabs.PROFILE);
    const [profileJson, setProfileJson] = useState<string>('');
    const [extendedInfoJSON, setExtendedInfoJSON] = useState<string>('');
    const [shortInfoJSON, setShortInfoJSON] = useState<string>('');
    const [locationsJSON, setLocationsJSON] = useState<string>('');
    const [userSettingsJSON, setUserSettingsJSON] = useState<string>('');
    const [userSessionsJSON, setUserSessionsJSON] = useState<string>('');
    const [userLoginsJSON, setUserLoginsJSON] = useState<string>('');
    const [userSubusersJSON, setUserSubusersJSON] = useState<string>('');
    const [userSalesPersonsJSON, setSalesPersonsJSON] = useState<string>('');

    const [username, setUsername] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const [userPermissionsJSON, setUserPermissionsJSON] = useState<string>('');
    const [initialUserPermissionsJSON, setInitialUserPermissionsJSON] = useState<string>('');
    const [modifiedJSON, setModifiedJSON] = useState<string>('');

    const { handleShowToast } = useToast();

    useEffect(() => {
        if (id) {
            getUserProfile(id).then((response) => {
                setProfileJson(JSON.stringify(response, null, 2));
            });
            getUserExtendedInfo(id).then((response) => {
                setExtendedInfoJSON(JSON.stringify(response, null, 2));
            });
            getUserShortInfo(id).then((response) => {
                setUsername(response.userName);
                setShortInfoJSON(JSON.stringify(response, null, 2));
            });
            getUserLocations(id).then((response) => {
                setLocationsJSON(JSON.stringify(response, null, 2));
            });
            getUserPermissions(id).then((response) => {
                const sortedPermissions = sortPermissions(response);
                const stringifiedResponse = JSON.stringify(sortedPermissions, null, 2);
                setUserPermissionsJSON(stringifiedResponse);
                setInitialUserPermissionsJSON(stringifiedResponse);
                const filteredData = filterObjectValues(sortedPermissions);
                setModifiedJSON(filteredData);
            });
            getUserSettings(id).then((response) => {
                setUserSettingsJSON(JSON.stringify(response, null, 2));
            });
            listUserSessions(id).then((response) => {
                setUserSessionsJSON(JSON.stringify(response, null, 2));
            });
            listUserLogins(id).then((response) => {
                setUserLoginsJSON(JSON.stringify(response, null, 2));
            });
            listSubusers(id).then((response) => {
                setUserSubusersJSON(JSON.stringify(response, null, 2));
            });
            listSalesPersons(id).then((response) => {
                setSalesPersonsJSON(JSON.stringify(response, null, 2));
            });
        }
    }, [id]);

    useEffect(() => {
        if (initialUserPermissionsJSON !== userPermissionsJSON) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [userPermissionsJSON, initialUserPermissionsJSON]);

    const handleChangeUserPermissions = ([fieldName, fieldValue]: [string, number]): void => {
        const parsedUserPermission = JSON.parse(userPermissionsJSON);
        parsedUserPermission[fieldName] = fieldValue;
        setUserPermissionsJSON(JSON.stringify(parsedUserPermission, null, 2));
        setModifiedJSON(filterObjectValues(parsedUserPermission));
    };

    const handleSetUserPermissions = async (): Promise<void> => {
        try {
            if (id) {
                const response = await setUserPermissions(id, JSON.parse(userPermissionsJSON));
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> permissions successfully saved`,
                        type: 'success',
                    });
                }
            }
        } catch (err) {
            const { message } = err as Error | AxiosError;
            handleShowToast({ message, type: 'danger' });
        }
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
            <div className='col-12'>
                <div className='card card-custom mb-5 vw-90 mx-auto'>
                    <div className='card-header'>
                        <h3 className='card-title fw-bolder text-dark'>
                            {username && `${username}'s User Card`}
                        </h3>
                    </div>
                    <div className='card-body d-flex flex-column justify-content-end pb-0'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            {userCardTabsArray.map((tab) => (
                                <TabNavigate
                                    key={tab}
                                    tab={tab}
                                    activeTab={activeTab}
                                    onTabClick={handleTabClick}
                                />
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='tab-content' id='myTabPanel'>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.PROFILE}>
                        <TabDataWrapper data={profileJson} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.EXTENDEDINFO}>
                        <TabDataWrapper data={extendedInfoJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.SHORTINFO}>
                        <TabDataWrapper data={shortInfoJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.LOCATIONS}>
                        <TabDataWrapper data={locationsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.USERPERMISSIONS}>
                        <TabDataWrapper
                            data={JSON.stringify(modifiedJSON)}
                            checkbox={true}
                            action={handleChangeUserPermissions}
                        >
                            <PrimaryButton
                                children='Save permissions'
                                icon='check'
                                disabled={isButtonDisabled}
                                buttonClickAction={handleSetUserPermissions}
                            />
                        </TabDataWrapper>
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.SETTINGS}>
                        <TabDataWrapper data={userSettingsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.SESSIONS}>
                        <TabDataWrapper data={userSessionsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.LOGINS}>
                        <TabDataWrapper data={userLoginsJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.SUBUSERS}>
                        <TabDataWrapper data={userSubusersJSON} />
                    </TabPanel>
                    <TabPanel activeTab={activeTab} tabName={UserCardTabs.SALESPERSONS}>
                        <TabDataWrapper data={userSalesPersonsJSON} />
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
