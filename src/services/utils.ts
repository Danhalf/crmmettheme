import { STORAGE_USER } from 'app-consts';

export function getToken(): string | null {
    const userLocalStorage = localStorage.getItem(STORAGE_USER);

    return !!userLocalStorage ? JSON.parse(userLocalStorage)?.token : null;
}
