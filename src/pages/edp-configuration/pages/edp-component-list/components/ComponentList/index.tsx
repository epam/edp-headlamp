import React from 'react';
import { Table } from '../../../../../../components/Table';
import { useColumns } from './hooks/useColumns';
import { EDPComponentListProps } from './types';

export const EDPComponentList = ({ items, error, filterFunction }: EDPComponentListProps) => {
    const columns = useColumns();

    return (
        <>
            <Table
                isLoading={!items}
                data={items}
                error={error?.toString()}
                columns={columns}
                filterFunction={filterFunction}
            />
        </>
    );
};
