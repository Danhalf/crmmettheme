import { STORAGE_USER } from 'app-consts';
import axios from 'axios';

export const useAuthInterceptor = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem(STORAGE_USER);
                return error.response.data.error;
            }
        }
    );
};
