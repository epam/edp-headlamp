import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { CREATE_CLUSTER_DIALOG_NAME } from '../../../../widgets/CreateCluster/constants';
import { useColumns } from './hooks/useColumns';
import { ClusterListProps } from './types';

export const ClusterList = ({ clusterSecrets, error }: ClusterListProps) => {
    const columns = useColumns();
    const filterFunction = Utils.useFilterFunc();

    const { setDialog } = useDialogContext();

    return (
        <Table
            data={clusterSecrets}
            columns={columns}
            isLoading={!clusterSecrets}
            error={error}
            filterFunction={filterFunction}
            emptyListComponent={
                <EmptyList
                    missingItemName={'clusters'}
                    handleClick={() =>
                        setDialog({
                            modalName: CREATE_CLUSTER_DIALOG_NAME,
                        })
                    }
                />
            }
        />
    );
};
