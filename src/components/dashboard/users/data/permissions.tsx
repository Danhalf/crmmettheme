import { UserPermissionsRecord } from 'common/interfaces/UserData';

const sortPermissionsKeys: ReadonlyArray<string> = ['Contacts', 'Deal'];

export const sortPermissions = (permissions: UserPermissionsRecord) => {
    const contactPermissions: UserPermissionsRecord = {};
    const dealsPermissions: UserPermissionsRecord = {};
    const otherPermissions: UserPermissionsRecord = {};
    const [contacts, deals] = sortPermissionsKeys;

    for (const key in permissions) {
        if (permissions.hasOwnProperty(key)) {
            const value = permissions[key];
            if (key.includes(contacts)) {
                contactPermissions[key] = value;
            } else if (key.includes(deals)) {
                dealsPermissions[key] = value;
            } else {
                otherPermissions[key] = value;
            }
        }
    }

    return {
        ...contactPermissions,
        ...dealsPermissions,
        ...otherPermissions,
    };
};

export const filterObjectValues = (json: UserPermissionsRecord) => {
    const filteredObj: any = {};
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const value = json[key];
            if (value === 0 || value === 1) {
                filteredObj[key] = value;
            }
        }
    }

    return filteredObj;
};
