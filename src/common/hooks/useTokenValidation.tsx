import { useMemo } from 'react';
import { checkToken } from 'services/auth.service';

export const useTokenValidation = (token) => {
    const isTokenValid = useMemo(() => {
        if (!!token) {
            const result = checkToken(token)
                .then(() => true)
                .catch(() => false);
            return result;
        }
        return null;
    }, [token]);

    return isTokenValid;
};
