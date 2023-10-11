import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useAuthInterceptor = () => {
    const navigate = useNavigate();

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                navigate('/');
            }
            return Promise.reject(error);
        }
    );
};
