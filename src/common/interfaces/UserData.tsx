import { Status } from './ActionStatus';

/* eslint-disable no-unused-vars */
export interface UserInputData {
    username: string;
    password: string;
}

export enum UserPermissions {
    USER = 'user',
    SALES_PERSON = 'sales_person',
    MANAGER = 'manager',
    LOCAL_ADMIN = 'localadmin',
    ADMIN = 'admin',
}

export const responseMappings = {
    isadmin: UserPermissions.ADMIN,
    islocaladmin: UserPermissions.LOCAL_ADMIN,
    ismanager: UserPermissions.MANAGER,
    issalesperson: UserPermissions.SALES_PERSON,
};

export interface User {
    created?: string;
    createdbyuid?: string;
    index?: number;
    parentuid?: string;
    parentusername?: string;
    creatorusername?: string;
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

export interface UserCreateValidationError {
    error: string;
    info: string;
    status: Status.ERROR;
}

export interface UserCreateValidationExists {
    exists: boolean;
    status: Status.OK;
    username: string;
}

export type UserCreateValidationResponse = UserCreateValidationError | UserCreateValidationExists;

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

export interface Location {
    created: string;
    index: number;
    locEmail1: string;
    locEmail2: string;
    locManager1: string;
    locManager2: string;
    locName: string;
    locPhone1: string;
    locPhone2: string;
    locState: string;
    locStreetAddress: string;
    locWeb: string;
    locZIP: string;
    locationuid: string;
    updated: string;
    useruid: string;
}

export interface UserInfo {
    ZIP: string;
    companyName: string;
    created: string;
    email1: string;
    email2: string;
    firstName: string;
    index: number;
    lastName: string;
    locations: Location[];
    messager1: string;
    messager2: string;
    phone1: string;
    phone2: string;
    state: string;
    status: Status;
    streetAddress: string;
    updated: string;
    userName: string;
    useruid: string;
}
