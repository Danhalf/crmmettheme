/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect, useMemo, PropsWithChildren } from 'react';
import { useQuery } from 'react-query';
import { useQueryRequest } from './QueryRequestProvider';
import {
    createResponseContext,
    initialQueryResponse,
    stringifyRequestQuery,
    Response,
    initialQueryState,
} from '_metronic/helpers';
import { User, UsersType } from 'common/interfaces/UserData';
import { UserQuery } from 'common/interfaces/QueriesParams';
import { getUsers } from 'services/user.service';

const QueryResponseContext = createResponseContext<User>(initialQueryResponse);
export const QueryResponseProvider = ({ children }: PropsWithChildren<{}>) => {
    const { state } = useQueryRequest();
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

    const {
        isFetching,
        refetch,
        data: axiosResponse,
    } = useQuery(
        UsersType.ACTIVE,
        () => {
            const currentQuery: UserQuery = {
                skip: state.currentpage || initialQueryState.currentpage,
                top: state.count || initialQueryState.count,
                column: state.sort || initialQueryState.sort,
                qry: state.search || initialQueryState.search,
                type: state.order || initialQueryState.order,
            };

            return getUsers(currentQuery);
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    );

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery);
            refetch();
        }
    }, [updatedQuery]);

    const response: Response<User[]> = {
        data: axiosResponse,
    };

    return (
        <QueryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryResponseContext.Provider>
    );
};

export const useQueryResponse = () => useContext(QueryResponseContext);

export const useQueryResponseData = () => {
    const { response } = useQueryResponse();
    if (!response) {
        return [];
    }

    return response?.data || [];
};

export const useQueryResponseDataLength = (): number => {
    const { response } = useQueryResponse();
    return response?.data?.length || 0;
};

export const useQueryResponseLoading = (): boolean => {
    const { isLoading } = useQueryResponse();
    return isLoading;
};
