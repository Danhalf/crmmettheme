export interface AuthModel {
    modified: string;
    sessionuid: string;
    started: string;
    status: string;
    token: string;
    useruid: string;

}

export interface UserModel {
    username: string;
    password: string;
}
