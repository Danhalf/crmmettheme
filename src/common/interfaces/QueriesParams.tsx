export type SortType = 'asc' | 'desc';

export interface SortParams {
    type: SortType;
}

export interface UserSortParams extends SortParams {
    column: 'username';
}

export interface UserQuery {
    skip?: number;
    top?: number;
    column?: string;
    qry?: string;
    type?: SortType;
}
