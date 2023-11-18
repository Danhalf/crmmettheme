import { QueryRequestProvider } from 'common/core/QueryRequestProvider';
import { QueryResponseProvider } from 'common/core/QueryResponseProvider';
import { useContext, useEffect, useState } from 'react';
import { CustomModal } from '../helpers/modal/renderModalHelper';
import { PrimaryButton } from '../smallComponents/buttons/PrimaryButton';
import { UsersListSearchComponent } from '../smallComponents/search/Search';
import { UserModal } from './UserModal/parts/UserModal';
import { UsersTable } from './table/UsersTable';
import { UserContext } from 'Content';

export const Users = () => {
    const [addUserModalEnabled, setAddUserModalEnabled] = useState<boolean>(false);
    const handleAddUserModalOpen = () => setAddUserModalEnabled(!addUserModalEnabled);

    const { userPermissions } = useContext(UserContext);

    const [user, setUser] = useState(['']);

    useEffect(() => {
        setUser([...userPermissions]);
    }, []);

    // eslint-disable-next-line no-console
    console.log(user);

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
                                {
                                    <PrimaryButton
                                        icon='plus'
                                        buttonClickAction={handleAddUserModalOpen}
                                    >
                                        Add User
                                    </PrimaryButton>
                                }
                            </div>
                            <UsersTable />
                        </div>
                    </div>
                </div>
            </QueryResponseProvider>
        </QueryRequestProvider>
    );
};
