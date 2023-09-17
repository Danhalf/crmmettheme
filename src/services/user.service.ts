import axios, { AxiosResponse } from 'axios';
import { getToken } from './utils';
import { API_URL } from '../app-consts';

export interface User {
    created: string;
    createdbyuid: string;
    index: number;
    parentuid: string;
    parentusername: string;
    updated: string;
    username: string;
    useruid: string;
    isAdmin: number;
}

type Method = 'get' | 'post';

type ActionStatus = {
    status: string;
};

const fetchApiData = async <T>(url: string, method: Method, data?: any): Promise<T> => {
    try {
        const response: AxiosResponse<T> = await axios({
            method: method,
            url: API_URL + url,
            data: data,
            headers: { Authorization: `Bearer ${getToken()}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = (
    loginname: string,
    loginpassword: string,
    uid: string = '0'
): Promise<any> => {
    return fetchApiData(`user/${uid}/user`, 'post', { loginname, loginpassword });
};

export const copyUser = (srcuid: string): Promise<any> => {
    return fetchApiData<ActionStatus>(`user/${srcuid}/copyuser`, 'post');
};

export const setUserOptionalData = (uid: string, data: any): Promise<any> => {
    return fetchApiData(`user/${uid}/set`, 'post', data);
};

export const getUsers = (useruid = '0'): Promise<User[]> => {
    return fetchApiData<User[]>(`user/${useruid}/listclients`, 'get');
};

export const deleteUser = (uid: string): Promise<any> => {
    return fetchApiData<ActionStatus>(`user/${uid}/delete`, 'post');
};

export const setUserPermissions = (uid: string, data: any): Promise<any> => {
    return fetchApiData(`user/${uid}/permissions`, 'post', data);
};

export const getUserPermissions = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/permissions`, 'get');
};

export const getUserExtendedInfo = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/info`, 'get');
};

export const getUserLocations = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/locations`, 'get');
};

export const getUserProfile = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/profile`, 'get');
};

export const setUserSettings = (uid: string, data: any): Promise<any> => {
    return fetchApiData(`user/${uid}/settings`, 'post', data);
};

export const getUserSettings = (uid: string): Promise<any> => {
    return fetchApiData(`user/${uid}/settings`, 'get');
};

export const listUserSessions = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/sessions`, 'get');
};

export const killSession = (uid: string): Promise<any> => {
    return fetchApiData(`user/${uid}/session`, 'post');
};

export const listUserLogins = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/logins`, 'get');
};

export const listSubusers = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/subusers`, 'get');
};

export const listSalesPersons = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/salespersons`, 'get');
};

export const getUserShortInfo = (uid: string): Promise<string> => {
    return fetchApiData<string>(`user/${uid}/username`, 'get');
};
