import clsx from 'clsx';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

type ToastType = 'success' | 'danger' | undefined;

interface ToastData {
    message: string;
    type?: ToastType;
}

const ToastContext = createContext({
    handleShowToast: ({ message, type }: ToastData): void => {},
    handleToastClose: (): void => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<ToastType>(undefined);
    const [toastHeaderText, setToastHeaderText] = useState<string>('');

    useEffect(() => {
        switch (toastType) {
            case 'success':
                setToastHeaderText('Success!');
                break;
            case 'danger':
                setToastHeaderText('Error!');
                break;
            default:
                setToastHeaderText('Message:');
                break;
        }
    }, [toastType]);

    const handleShowToast = ({ message, type }: ToastData) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    const handleToastClose = () => {
        setShowToast(false);
        setToastType(undefined);
        setToastMessage('');
    };

    return (
        <ToastContext.Provider value={{ handleShowToast, handleToastClose }}>
            {children}
            <ToastContainer position='top-end'>
                <Toast show={showToast} onClose={handleToastClose} delay={6000} autohide>
                    <Toast.Header
                        className={clsx(`fs-6 bg-${toastType} text-white`)}
                        closeVariant='white'
                    >
                        <strong className='me-auto'>{toastHeaderText}</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <span className='fs-6'>{toastMessage}</span>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </ToastContext.Provider>
    );
};
