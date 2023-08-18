import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSettings } from './useSettings';

// START: This code is a direct copy from headlamp origin

type URLStateParams<T> = {
    /** The defaultValue for the URL state. */
    defaultValue: T;
    /** Whether to hide the parameter when the value is the default one (true by default). */
    hideDefault?: boolean;
    /** The prefix of the URL key to use for this state (a prefix 'my' with a key name 'key' will be used in the URL as 'my.key'). */
    prefix?: string;
};
export function useURLState(
    key: string,
    defaultValue: number
): [number, React.Dispatch<React.SetStateAction<number>>];
export function useURLState(
    key: string,
    valueOrParams: number | URLStateParams<number>
): [number, React.Dispatch<React.SetStateAction<number>>];
/**
 * A hook to manage a state variable that is also stored in the URL.
 *
 * @param key The name of the key in the URL. If empty, then the hook behaves like useState.
 * @param paramsOrDefault The default value of the state variable, or the params object.
 *
 */
export function useURLState<T extends string | number | undefined = string>(
    key: string,
    paramsOrDefault: T | URLStateParams<T>
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const params: URLStateParams<T> =
        typeof paramsOrDefault === 'object' ? paramsOrDefault : { defaultValue: paramsOrDefault };
    const { defaultValue, hideDefault = true, prefix = '' } = params;
    const history = useHistory();
    // Don't even use the prefix if the key is empty
    const fullKey = !key ? '' : !!prefix ? prefix + '.' + key : key;

    const getURLValue = React.useCallback(() => {
        // An empty key means that we don't want to use the state from the URL.

        if (fullKey === '') {
            return null;
        }

        const urlParams = new URLSearchParams(history.location.search);
        const urlValue = urlParams.get(fullKey);
        if (urlValue === null) {
            return null;
        }
        let newValue: string | number = urlValue;
        if (typeof defaultValue === 'number') {
            newValue = Number(urlValue);
            if (Number.isNaN(newValue)) {
                return null;
            }
        }

        return newValue;
    }, [defaultValue, fullKey, history.location.search]);

    const initialValue = React.useMemo(() => {
        const newValue = getURLValue();
        if (newValue === null) {
            return defaultValue;
        }
        return newValue;
    }, [defaultValue, getURLValue]);
    const [value, setValue] = React.useState<T>(initialValue as T);

    React.useEffect(
        () => {
            const newValue = getURLValue();
            if (newValue === null) {
                if (defaultValue !== undefined && defaultValue !== value) {
                    setValue(defaultValue);
                }
            } else if (newValue !== value) {
                setValue(newValue as T);
            }
        },
        // eslint-disable-next-line
        [history]
    );

    React.useEffect(() => {
        // An empty key means that we don't want to use the state from the URL.
        if (fullKey === '') {
            return;
        }

        const urlCurrentValue = getURLValue();

        if (urlCurrentValue === value) {
            return;
        }

        const urlParams = new URLSearchParams(history.location.search);
        let shouldUpdateURL = false;

        if ((value === null || value === defaultValue) && hideDefault) {
            if (urlParams.has(fullKey)) {
                urlParams.delete(fullKey);
                shouldUpdateURL = true;
            }
        } else if (value !== undefined) {
            const urlValue = value as NonNullable<T>;

            urlParams.set(fullKey, urlValue.toString());
            shouldUpdateURL = true;
        }

        if (shouldUpdateURL) {
            history.replace({ search: urlParams.toString() });
        }
    }, [defaultValue, fullKey, getURLValue, hideDefault, history, value]);

    return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}

function usePageURLState(
    key: string,
    prefix: string,
    initialPage: number
): ReturnType<typeof useURLState> {
    const [page, setPage] = useURLState(key, { defaultValue: initialPage + 1, prefix });
    const [zeroIndexPage, setZeroIndexPage] = React.useState(page - 1);

    React.useEffect(() => {
        setZeroIndexPage((zeroIndexPage: number) => {
            if (page - 1 !== zeroIndexPage) {
                return page - 1;
            }

            return zeroIndexPage;
        });
    }, [page]);

    React.useEffect(() => {
        setPage(zeroIndexPage + 1);
    }, [setPage, zeroIndexPage]);

    return [zeroIndexPage, setZeroIndexPage];
}

function getTablesRowsPerPage(defaultRowsPerPage: number = 15) {
    const perPageStr = localStorage.getItem('tables_rows_per_page');
    if (!perPageStr) {
        return defaultRowsPerPage;
    }

    return parseInt(perPageStr);
}

// END: This code is a direct copy from headlamp origin

export const usePagination = ({ reflectInURL, prefix, initialPage, rowsPerPage }) => {
    const [page, setPage] = usePageURLState(reflectInURL ? 'p' : '', prefix, initialPage);
    const storeRowsPerPageOptions = useSettings('tableRowsPerPageOptions');

    const rowsPerPageOptions = rowsPerPage || storeRowsPerPageOptions;
    const defaultRowsPerPage = React.useMemo(
        () => getTablesRowsPerPage(rowsPerPageOptions[0]),
        [rowsPerPageOptions]
    );
    const [_rowsPerPage, setRowsPerPage] = useURLState(reflectInURL ? 'perPage' : '', {
        defaultValue: defaultRowsPerPage,
        prefix,
    });

    const handleChangePage = React.useCallback(
        (event: unknown, newPage: number) => {
            setPage(newPage);
        },
        [setPage]
    );

    const handleChangeRowsPerPage = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const numRows = parseInt(event.target.value, 10);
            setRowsPerPage(numRows);
            setPage(0);
            localStorage.setItem('tables_rows_per_page', numRows.toString());
        },
        [setPage, setRowsPerPage]
    );

    return React.useMemo(
        () => ({
            page,
            rowsPerPage: _rowsPerPage,
            handleChangePage,
            handleChangeRowsPerPage,
        }),
        [_rowsPerPage, handleChangePage, handleChangeRowsPerPage, page]
    );
};
