import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface CustomToastProps {
    type: 'success' | 'warning';
    content: string;
}

export const CustomToast = ({ type, content }: CustomToastProps): JSX.Element => {
    const [showToast, setShowToast] = useState<boolean>(true);

    const handleToastClose = () => {
        setShowToast(false);
    };

    return (
        <ToastContainer position='bottom-end'>
            <Toast
                show={showToast}
                onClose={handleToastClose}
                bg={type}
                // delay={5000}
                // autohide
            >
                <Toast.Header>
                    {/* <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' /> */}
                    <strong className='me-auto'>
                        {type === 'success' ? 'Action successfully' : 'An action error'}
                    </strong>
                </Toast.Header>
                <Toast.Body>{content}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};
