import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { ClusterListProps } from './types';

export const ClusterList = ({ clusterSecrets, error }: ClusterListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={clusterSecrets}
            errorMessage={error?.toString()}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
