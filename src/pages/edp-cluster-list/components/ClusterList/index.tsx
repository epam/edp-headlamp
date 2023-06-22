import React from 'react';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { ClusterListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const ClusterList = ({ clusterSecrets, error }: ClusterListProps) => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

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
