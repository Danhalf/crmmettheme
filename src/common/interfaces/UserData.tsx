import { Status } from './ActionStatus';

/* eslint-disable no-unused-vars */
export interface UserInputData {
    username: string;
    password: string;
}

export interface User {
    created?: string;
    createdbyuid?: string;
    index?: number;
    parentuid?: string;
    parentusername?: string;
    updated?: string;
    username: string;
    useruid: string;
    isadmin?: number;
}

export interface ShortUserInfo {
    firstName: string;
    lastName: string;
    loginname: string;
    middleName: string;
    status: Status;
    userName: string;
    useruid: string;
    warning: string;
}

export interface UserPermissionsRecord {
    [key: string]: number;
}

export interface UserPermissionsData {
    permissions: {
        all: UserPermissionsRecord;
        app: UserPermissionsRecord;
        crm: UserPermissionsRecord;
    };
    status: Status;
    useruid: string;
}

export enum UsersType {
    ACTIVE = 'Users',
}
