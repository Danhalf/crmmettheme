import { createContext, useEffect, useState } from 'react';
import qs from 'qs';
import { QueryResponseContextProps, QueryState } from './models';

export function createResponseContext<T>(initialState: QueryResponseContextProps<T>) {
    return createContext(initialState);
}

export function isNotEmpty(obj: unknown) {
    return obj !== undefined && obj !== null && obj !== '';
}

export function stringifyRequestQuery(state: QueryState): string {
    const pagination = qs.stringify(state, {
        filter: ['currentpage', 'count'],
        skipNulls: true,
    });
    const sort = qs.stringify(state, { filter: ['sort', 'order'], skipNulls: true });
    const search = isNotEmpty(state.search)
        ? qs.stringify(state, { filter: ['search'], skipNulls: true })
        : '';

    return [pagination, sort, search]
        .filter((f) => f)
        .join('&')
        .toLowerCase();
}

export function useDebounce(value: string | undefined, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

export const throttle = (fn: Function, wait: number = 300) => {
    let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number;
    return function (this: any) {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(
                () => {
                    if (Date.now() - lastTime >= wait) {
                        fn.apply(context, args);
                        lastTime = Date.now();
                    }
                },
                Math.max(wait - (Date.now() - lastTime), 0)
            );
        }
    };
};
