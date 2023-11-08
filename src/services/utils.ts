import { STORAGE_USER } from 'app-consts';

export const getApplicationType = () => ({ application: 'crm' });

export function getToken(): string | null {
    const userLocalStorage = localStorage.getItem(STORAGE_USER);

    return !!userLocalStorage ? JSON.parse(userLocalStorage)?.token : null;
}
