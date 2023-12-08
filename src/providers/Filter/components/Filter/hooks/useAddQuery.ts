import { useHistory, useLocation } from 'react-router-dom';

export const useAddQuery = () => {
    const history = useHistory();
    const location = useLocation();

    return (
        queryObj: { [key: string]: string },
        queryParamDefaultObj: { [key: string]: string } = {},
        tableName = ''
    ) => {
        const pathname = location.pathname;
        const searchParams = new URLSearchParams(location.search);

        if (!!tableName) {
            searchParams.set('tableName', tableName);
        }
        // Ensure that default values will not show up in the URL
        for (const key in queryObj) {
            const value = queryObj[key];
            if (value !== queryParamDefaultObj[key]) {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }

        history.push({
            pathname: pathname,
            search: searchParams.toString(),
        });
    };
};
