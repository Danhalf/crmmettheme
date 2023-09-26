interface UserConfirmModalProps {
    username: string;
}

export const UserConfirmModal = ({ username }: UserConfirmModalProps): JSX.Element => {
    return (
        <>
            Do you want to delete <b>{username}</b>?
        </>
    );
};
