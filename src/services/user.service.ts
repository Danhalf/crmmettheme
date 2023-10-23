import axios, { AxiosResponse } from 'axios';
import { getToken } from './utils';
import { API_URL } from '../app-consts';
import { ShortUserInfo, User, UserPermissions } from 'common/interfaces/UserData';
import { UserQuery } from 'common/interfaces/QueriesParams';

export enum Status {
    // eslint-disable-next-line no-unused-vars
    OK = 'OK',
}

type Method = 'GET' | 'POST';

type ActionStatus = {
    status: Status;
};

const fetchApiData = async <T>(
    method: Method,
    url: string,
    options?: { data?: unknown; params?: UserQuery }
): Promise<T> => {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const { data, params } = options || {};
    try {
        const response: AxiosResponse<T> = await axios({
            method,
            url: API_URL + url,
            data,
            params,
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTotalUsersRecords = (): Promise<{ status: string; total: number }> => {
    return fetchApiData<{ status: string; total: number }>('GET', `user/0/listclients?total=1`);
};

export const createOrUpdateUser = (userData: {
    loginname?: string;
    loginpassword: string;
    uid?: string;
}): Promise<any> => {
    const { uid, ...reqBody } = userData;

    return fetchApiData('POST', `user/${uid || '0'}/user`, { data: reqBody });
};

export const copyUser = (srcuid: string): Promise<any> => {
    return fetchApiData<ActionStatus>('POST', `user/${srcuid}/copyuser`);
};

export const setUserOptionalData = (uid: string, data: any): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/set`, { data });
};

export const getUsers = (params?: UserQuery): Promise<User[]> => {
    const initialParams: UserQuery = {
        column: params?.column || 'username',
        type: params?.type || 'asc',
        skip: params?.skip || 0,
        qry: params?.qry || '',
        top: params?.top || 10,
    };

    return fetchApiData<User[]>('GET', `user/0/listclients`, { params: initialParams });
};

export const deleteUser = (uid: string): Promise<any> => {
    return fetchApiData<ActionStatus>('POST', `user/${uid}/delete`);
};

export const setUserPermissions = (uid: string, data: any): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/permissions`, { data });
};

export const getUserPermissions = (uid: string): Promise<UserPermissions> => {
    return fetchApiData<UserPermissions>('GET', `user/${uid}/permissions`);
};

export const getUserExtendedInfo = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/info`);
};

export const getUserLocations = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/locations`);
};

export const getUserProfile = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/profile`);
};

export const setUserSettings = (uid: string, data: any): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/settings`, { data });
};

export const getUserSettings = (uid: string): Promise<any> => {
    return fetchApiData('GET', `user/${uid}/settings`);
};

export const listUserSessions = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/sessions`);
};

export const killSession = (uid: string): Promise<any> => {
    return fetchApiData('POST', `user/${uid}/session`);
};

export const listUserLogins = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/logins`);
};

export const listSubusers = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/subusers`);
};

export const listSalesPersons = (uid: string): Promise<string> => {
    return fetchApiData<string>('GET', `user/${uid}/salespersons`);
};

export const getUserShortInfo = (uid: string): Promise<ShortUserInfo> => {
    return fetchApiData<ShortUserInfo>('GET', `user/${uid}/username`);
};
