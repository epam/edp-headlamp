import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useDialogContext } from '../../../../providers/Dialog/hooks';
import { CREATE_GIT_SERVER_DIALOG_NAME } from '../../../../widgets/CreateGitServer/constants';
import { useColumns } from './hooks/useColumns';
import { GitServerListProps } from './types';

export const GitServerList = ({ gitServers, error }: GitServerListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();

    const { setDialog } = useDialogContext();

    return (
        <Table
            data={gitServers}
            columns={columns}
            isLoading={!gitServers}
            error={error}
            filterFunction={filterFunc}
            emptyListComponent={
                <EmptyList
                    missingItemName={'Git Servers'}
                    handleClick={() =>
                        setDialog({
                            modalName: CREATE_GIT_SERVER_DIALOG_NAME,
                        })
                    }
                />
            }
        />
    );
};
