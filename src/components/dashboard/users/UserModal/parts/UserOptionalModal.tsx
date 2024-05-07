import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { deepEqual } from 'components/dashboard/helpers/common';
import { PrimaryButton } from 'components/dashboard/smallComponents/buttons/PrimaryButton';
import {
    Status,
    addUserLocation,
    getUserExtendedInfo,
    getUserLocations,
    setUserOptionalData,
} from 'services/user.service';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { AxiosError } from 'axios';
import { renamedKeys } from 'app-consts';
import { TabPanel } from 'components/dashboard/helpers/helpers';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';
import { Location } from 'common/interfaces/UserData';

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

const emptyLocation: Partial<Location> = {
    locEmail1: '',
    locEmail2: '',
    locManager1: '',
    locManager2: '',
    locName: '',
    locPhone1: '',
    locPhone2: '',
    locState: '',
    locStreetAddress: '',
    locWeb: '',
    locZIP: '',
};

const hiddenKeys: readonly ['locationuid', ...string[]] = ['locationuid', 'useruid', 'index'];
const disabledKeys: readonly string[] = ['useruid', 'created', 'updated'];

const [locationuid] = hiddenKeys;
export const UserOptionalModal = ({
    onClose,
    useruid,
    username,
}: UserOptionalModalProps): JSX.Element => {
    const [optional, setOptional] = useState<Record<string, string | number>[]>([]);
    const [activeTab, setActiveTab] = useState<string>('0');
    const [initialUserOptional, setInitialUserOptional] = useState<
        Record<string, string | number>[]
    >([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [locationKeys, setLocationKeys] = useState<string[]>([]);
    const [newLocation, setNewLocation] = useState<Partial<Location> | null>(null);

    const { handleShowToast } = useToast();

    const UserOptionalSchema = Yup.object().shape({
        locEmail1: Yup.string().email('Please enter valid email address'),
        locEmail2: Yup.string().email('Please enter valid email address'),
        locPhone1: Yup.string().matches(/^[\d]{10,13}$/, {
            message: 'Please enter a valid number.',
            excludeEmptyString: false,
        }),
        locPhone2: Yup.string().matches(/d{10,13}$/, {
            message: 'Please enter a valid number.',
            excludeEmptyString: false,
        }),
        locZIP: Yup.string().matches(/^\d{5}$/, 'Please enter a valid 5-digit ZIP'),
    });

    const userOptionalValidateFields = Object.keys(UserOptionalSchema.fields);

    const fetchData = async () => {
        try {
            if (useruid) {
                const extendedInfo = await getUserExtendedInfo(useruid);
                const companyName = extendedInfo?.companyName;

                const response = await getUserLocations(useruid);

                if (response) {
                    const responseOptional = response;

                    const filteredOptional: Record<string, string>[] = responseOptional.map(
                        (option) => {
                            const filteredOption = Object.keys(option).reduce((acc, key) => {
                                if (key === locationuid) {
                                    setLocationKeys((keys: any) => [...keys, option[key]]);
                                }
                                if (!hiddenKeys.includes(key)) {
                                    acc[key] = option[key];
                                }
                                return acc;
                            }, {});

                            return filteredOption;
                        }
                    );

                    filteredOptional.forEach((item) => {
                        item.companyName = companyName || '';
                    });

                    setOptional(filteredOptional);
                    const deepClone = JSON.parse(JSON.stringify(filteredOptional));
                    setInitialUserOptional(deepClone);
                    setIsLoading(false);
                }
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            let newValue = value;
            if (name === 'locPhone1' || name === 'locPhone2') {
                newValue = value.replace(/[^0-9]/g, '');
            }
            optional[index][name] = newValue;

            setOptional([...optional]);
        },
        [optional]
    );

    const handleSetUserOptional = async (): Promise<void> => {
        setIsLoading(true);
        if (useruid) {
            const filteredOptional = optional.map((item, index) => {
                const filteredItem = { ...item };
                disabledKeys.forEach((key) => {
                    delete filteredItem[key];
                });
                filteredItem[locationuid] = locationKeys[index];

                return filteredItem;
            });
            const newOptional = { locations: filteredOptional };
            const [{ companyName }] = filteredOptional;
            try {
                const response = await setUserOptionalData(useruid, {
                    ...newOptional,
                    companyName,
                });
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

    const handleAddUserLocation = () => {
        const newLocation = { ...emptyLocation };
        setNewLocation(newLocation);
        setOptional([...optional, newLocation]);
        setActiveTab(optional.length.toString());
    };

    const handleSaveNewUserLocation = () => {
        setIsLoading(true);
        if (useruid && newLocation) {
            addUserLocation(useruid, { ...newLocation, useruid }).then(
                (response: Status | string) => {
                    if (response === Status.OK) {
                        setIsLoading(false);
                        setNewLocation(null);
                        handleShowToast({
                            message: `<strong>${username}</strong> location successfully created`,
                            type: 'success',
                        });
                        onClose();
                    } else {
                        setIsLoading(false);
                        handleShowToast({ message: response, type: 'danger' });
                    }
                }
            );
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
            <div className='d-flex justify-content-end my-3'>
                {!newLocation && (
                    <PrimaryButton
                        className='align-self-end'
                        icon='plus'
                        buttonClickAction={handleAddUserLocation}
                    >
                        Add Location
                    </PrimaryButton>
                )}
            </div>
            <TabSwitcher tabs={optional} activeTab={activeTab} handleTabClick={handleTabClick} />
            {optional.map((option: any, index: number) => (
                <div key={index} className='tab-content' id='myTabPanel'>
                    <Formik
                        initialValues={option}
                        onSubmit={handleSetUserOptional}
                        validationSchema={UserOptionalSchema}
                    >
                        {({ errors, touched }) => {
                            return (
                                <TabPanel activeTab={activeTab} tabName={`${index}`}>
                                    <Form>
                                        {[
                                            ...(Object.entries(option) as [
                                                string,
                                                string | number,
                                            ][]),
                                        ].map(([setting]) => {
                                            const settingName = renamedKeys[setting] || setting;
                                            return (
                                                <div className='fv-row mb-4' key={setting}>
                                                    <div className='row'>
                                                        <div className='col-4 d-flex pt-4'>
                                                            <label
                                                                htmlFor={setting}
                                                                className='fs-6 fw-bolder text-dark'
                                                            >
                                                                {settingName}
                                                            </label>
                                                        </div>
                                                        <div className='col-8 d-flex flex-column'>
                                                            <Field
                                                                key={setting}
                                                                autoComplete='off'
                                                                disabled={disabledKeys.includes(
                                                                    setting
                                                                )}
                                                                className={clsx(
                                                                    'form-control bg-transparent',
                                                                    userOptionalValidateFields.includes(
                                                                        setting
                                                                    ) && {
                                                                        ...{
                                                                            'border-danger':
                                                                                touched[setting] &&
                                                                                errors[setting],
                                                                        },
                                                                        ...{
                                                                            'border-secondary':
                                                                                touched[setting] &&
                                                                                !errors[setting],
                                                                        },
                                                                    }
                                                                )}
                                                                name={setting}
                                                                onChange={(
                                                                    event: ChangeEvent<HTMLInputElement>
                                                                ) =>
                                                                    handleChangeUserOptional(
                                                                        event,
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                            {touched[setting] &&
                                                                errors[setting] && (
                                                                    <div className='fv-plugins-message-container'>
                                                                        <div className='fv-help-block'>
                                                                            <span role='alert'>
                                                                                {String(
                                                                                    errors[setting]
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className='text-center mt-8'>
                                            {!newLocation ? (
                                                <PrimaryButton
                                                    icon='check'
                                                    disabled={
                                                        isButtonDisabled ||
                                                        !!Object.keys(errors).length
                                                    }
                                                    type='submit'
                                                >
                                                    Save user optional data
                                                </PrimaryButton>
                                            ) : (
                                                <PrimaryButton
                                                    className='align-self-end'
                                                    icon='check'
                                                    disabled={
                                                        !Object.values(newLocation).some(
                                                            (value) => value !== ''
                                                        ) || !newLocation.locName
                                                    }
                                                    buttonClickAction={handleSaveNewUserLocation}
                                                >
                                                    Save Location
                                                </PrimaryButton>
                                            )}
                                        </div>
                                    </Form>
                                </TabPanel>
                            );
                        }}
                    </Formik>
                </div>
            ))}
        </>
    );
};
