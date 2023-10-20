import { STORAGE_USER } from 'app-consts';
import axios from 'axios';
import { useToast } from 'components/dashboard/helpers/renderToastHelper';

export const useAuthInterceptor = () => {
    const { handleShowToast } = useToast();
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem(STORAGE_USER);
                handleShowToast({
                    message: error.response.data.error,
                    type: 'danger',
                });
                return error.response.data.error;
            }
        }
    );
};
