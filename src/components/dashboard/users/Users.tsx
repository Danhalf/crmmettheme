import { QueryRequestProvider } from 'common/core/QueryRequestProvider';
import { QueryResponseProvider } from 'common/core/QueryResponseProvider';
import { useState } from 'react';
import { CustomModal } from '../helpers/modal/renderModalHelper';
import { PrimaryButton } from '../smallComponents/buttons/PrimaryButton';
import { UsersListSearchComponent } from '../smallComponents/search/Search';
import { UserModal } from './UserModal/parts/UserModal';
import { UsersTable } from './table/UsersTable';
import { STORAGE_USER } from 'app-consts';

export const Users = () => {
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);
    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);

    const userStorage = localStorage.getItem(STORAGE_USER);

    const { isadmin, ismanager } = userStorage && JSON.parse(userStorage);
    const permissions = isadmin || ismanager;

    return (
        <QueryRequestProvider>
            <QueryResponseProvider>
                {addUserModalEnabled && (
                    <CustomModal onClose={handleAddUserModalOpen} title={'Add user'}>
                        <UserModal onClose={handleAddUserModalOpen} />
                    </CustomModal>
                )}
                <div className='card'>
                    <div className='card-body'>
                        <div className='tab-content' id='myTabContentInner'>
                            <div className='d-flex w-100 justify-content-between my-4'>
                                <UsersListSearchComponent />
                                {!!isadmin && (
                                    <PrimaryButton
                                        icon='plus'
                                        buttonClickAction={handleAddUserModalOpen}
                                    >
                                        Add User
                                    </PrimaryButton>
                                )}
                            </div>
                            <UsersTable />
                        </div>
                    </div>
                </div>
            </QueryResponseProvider>
        </QueryRequestProvider>
    );
};
