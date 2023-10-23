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
    status: 'OK' | 'Error';
    userName: string;
    useruid: string;
    warning: string;
}

export interface UserPermissions {
    status: string;
    uaAddContacts: number;
    uaAddCreditsAndFees: number;
    uaAddDeals: number;
    uaAddExpenses: number;
    uaAddInventory: number;
    uaAllowBackDatingPayments: number;
    uaAllowMobile: number;
    uaAllowPartialPayments: number;
    uaAllowPaymentCalculator: number;
    uaAllowPaymentQuote: number;
    uaAllowPrinting: number;
    uaAllowReports: number;
    uaAllowWeb: number;
    uaChangePayments: number;
    uaClientAdmin: number;
    uaCreateUsers: number;
    uaDeleteAccounts: number;
    uaDeleteContacts: number;
    uaDeleteDeal: number;
    uaDeleteInventory: number;
    uaDeletePayments: number;
    uaEditContacts: number;
    uaEditDealWashout: number;
    uaEditDeals: number;
    uaEditExpenses: number;
    uaEditInsuranceOnly: number;
    uaEditInventory: number;
    uaEditPaidComissions: number;
    uaEditPayments: number;
    uaEditSettings: number;
    uaLocationAdmin: number;
    uaManager: number;
    uaPrintDealsForms: number;
    uaSalesPerson: number;
    uaSystemAdmin: number;
    uaViewAccounts: number;
    uaViewContacts: number;
    uaViewCostsAndExpenses: number;
    uaViewDeals: number;
    uaViewInventory: number;
    useruid: string;
}

export enum UsersType {
    ACTIVE = 'Users',
}
