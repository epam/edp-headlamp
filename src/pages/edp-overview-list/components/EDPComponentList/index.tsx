import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { EmptyList } from '../../../../components/EmptyList';
import { Table } from '../../../../components/Table';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { EDPComponentListProps } from './types';

export const EDPComponentList: React.FC<EDPComponentListProps> = ({ EDPComponents, error }) => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const filterFunc = Utils.useFilterFunc();

    return (
        <>
            <Table
                isLoading={!EDPComponents}
                data={EDPComponents}
                error={error?.toString()}
                columns={columns}
                filterFunction={filterFunc}
                emptyListComponent={<EmptyList missingItemName={'EDPComponents'} />}
            />
        </>
    );
};
