import { Column } from 'react-table';
import { UserCustomHeader } from './UserCustomHeader';
import { UserLinkCell } from './UserLinkCell';
import { UserActionsCell } from './UserActionsCell';
import { User } from 'common/interfaces/UserData';

export const usersColumns = (): ReadonlyArray<Column<User>> => {
    return [
        {
            Header: 'Index',
            accessor: 'index',
        },
        {
            Header: (props) => (
                <UserCustomHeader tableProps={props} title='User name' className='w-300px' />
            ),
            id: 'username',
            Cell: ({ ...props }) => {
                const { useruid, username }: User = props.data[props.row.index];
                return <UserLinkCell useruid={useruid} username={username} />;
            },
        },
        {
            Header: 'Created by user',
            accessor: 'creatorusername',
        },
        {
            Header: 'Is admin',
            id: 'isadmin',
            Cell: ({ ...props }) => (props.data[props.row.index].isadmin ? 'yes' : 'no'),
        },
        {
            Header: 'Actions',
            id: 'actions',

            Cell: ({ ...props }) => {
                const { useruid, username }: User = props.data[props.row.index];
                return <UserActionsCell useruid={useruid} username={username} />;
            },
        },
    ];
};
