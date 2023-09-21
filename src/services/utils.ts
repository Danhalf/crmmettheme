import { STORAGE_USER } from 'app-consts';

export function getToken(): string {
    const userJson = localStorage.getItem(STORAGE_USER);
    let token = '';

    if (userJson) {
        token = JSON.parse(userJson).token;
    }
    return token;
}
