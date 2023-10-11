import axios from 'axios';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';
import { useNavigate } from 'react-router-dom';

export const useAuthInterceptor = () => {
    const navigate = useNavigate();

    const { handleShowToast } = useToast();

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                navigate('/');
                handleShowToast({
                    message: 'Your session has expired. Please login again.',
                    type: 'danger',
                });
            }
        }
    );
};
