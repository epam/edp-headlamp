import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { CDPipelineListProps } from './types';

export const CDPipelineList = ({ CDPipelines, error }: CDPipelineListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={CDPipelines}
            errorMessage={error?.toString()}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
