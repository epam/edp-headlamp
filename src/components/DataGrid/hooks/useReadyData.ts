import React from 'react';

interface UseReadyDataProps<DataType = unknown> {
    data: DataType[];
    filterFunction: (el: DataType) => boolean;
    isLoading: boolean;
    error: unknown;
}

export const useReadyData = <DataType>({
    data,
    filterFunction,
    isLoading,
    error,
}: UseReadyDataProps<DataType>) => {
    return React.useMemo(() => {
        if (!data || isLoading || error) {
            return;
        }

        let result = [...data];

        if (filterFunction) {
            result = result.filter(filterFunction);
        }

        return result;
    }, [data, error, isLoading, filterFunction]);
};
