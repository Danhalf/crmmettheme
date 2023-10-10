import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { deepEqual } from 'components/dashboard/helpers/common';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import { Status, getUserLocations, setUserOptionalData } from 'services/user.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { renamedKeys } from 'app-consts';
import { TabPanel } from 'components/dashboard/helpers/helpers';

interface UserOptionalModalProps {
    onClose: () => void;
    useruid: string;
    username: string;
}

const TabSwitcher = ({ tabs, activeTab, handleTabClick }) => {
    return (
        <div className='d-flex justify-content-center mb-3'>
            <div className='btn-group' role='group'>
                {tabs.map((_, idx) => (
                    <button
                        key={idx}
                        type='button'
                        className={`btn btn-secondary ${activeTab === `${idx}` ? 'active' : ''}`}
                        onClick={() => handleTabClick(`${idx}`)}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

const hiddenKeys = ['locuid', 'useruid', 'index'];
const disabledKeys = ['useruid', 'created', 'updated'];

export const UserOptionalModal = ({
    onClose,
    useruid,
    username,
}: UserOptionalModalProps): JSX.Element => {
    const [optional, setOptional] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string>('0');
    const [initialUserOptional, setInitialUserOptional] = useState<any>([]);
    const [allOptional, setAllOptional] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const { handleShowToast } = useToast();

    useEffect(() => {
        setIsLoading(true);
        if (useruid) {
            getUserLocations(useruid).then(async (response: any) => {
                setAllOptional(response);
                const responseOptional: any[] = response.locations;

                const filteredOptional = responseOptional.map((option) => {
                    const filteredOption = Object.keys(option).reduce((acc, key) => {
                        if (!hiddenKeys.includes(key)) {
                            acc[key] = option[key];
                        }
                        return acc;
                    }, {});

                    return filteredOption;
                });
                setOptional(filteredOptional);
                const deepClone = JSON.parse(JSON.stringify(responseOptional));
                setInitialUserOptional(deepClone);
                setIsLoading(false);
            });
        }
    }, [useruid]);

    useEffect(() => {
        const isEqual = deepEqual(initialUserOptional, optional);
        if (!isEqual && !isLoading) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [optional, initialUserOptional, isLoading]);

    const handleChangeUserOptional = useCallback(
        (event: ChangeEvent<HTMLInputElement>, index: number) => {
            const { name, value } = event.target;
            optional[index][name] = value;

            setOptional([...optional]);
        },
        [optional]
    );

    const handleSetUserOptional = async (): Promise<void> => {
        setIsLoading(true);
        if (useruid) {
            const newOptional = { ...allOptional, locations: optional };
            try {
                const response = await setUserOptionalData(useruid, newOptional);
                if (response.status === Status.OK) {
                    handleShowToast({
                        message: `<strong>${username}</strong> optional data successfully saved`,
                        type: 'success',
                    });
                    onClose();
                }
            } catch (err) {
                const { message } = err as Error | AxiosError;
                handleShowToast({ message, type: 'danger' });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    if (!optional) {
        return <></>;
    }

    return (
        <>
            <TabSwitcher tabs={optional} activeTab={activeTab} handleTabClick={handleTabClick} />
            {optional &&
                optional.map((option: any, index: number) => {
                    return (
                        <div key={index} className='tab-content' id='myTabPanel'>
                            <TabPanel activeTab={activeTab} tabName={`${index}`}>
                                {(Object.entries(option) as [string, string | number][]).map(
                                    ([setting, value]) => {
                                        const settingName = renamedKeys[setting] || setting;
                                        return (
                                            <div
                                                key={settingName}
                                                className='tab-content'
                                                id={activeTab}
                                            >
                                                <div className='fv-row mb-8' key={setting}>
                                                    <label
                                                        htmlFor={setting}
                                                        className='form-label fs-6 fw-bolder text-dark'
                                                    >
                                                        {settingName}
                                                    </label>
                                                    <input
                                                        disabled={disabledKeys.includes(setting)}
                                                        className='form-control bg-transparent'
                                                        name={setting}
                                                        type='text'
                                                        value={value}
                                                        onChange={(event) =>
                                                            handleChangeUserOptional(event, index)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                            </TabPanel>
                        </div>
                    );
                })}
            <TabSwitcher tabs={optional} activeTab={activeTab} handleTabClick={handleTabClick} />
            <div className='text-center mt-8'>
                <PrimaryButton
                    buttonText='Save user optional data'
                    icon='check'
                    disabled={isButtonDisabled}
                    buttonClickAction={handleSetUserOptional}
                />
            </div>
        </>
    );
};
