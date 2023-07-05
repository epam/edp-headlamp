import { Utils } from '@kinvolk/headlamp-plugin/lib';
import React from 'react';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { EDPComponentListProps } from './types';

export const EDPComponentList: React.FC<EDPComponentListProps> = ({ EDPComponents, error }) => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const filterFunc = Utils.useFilterFunc();

    return (
        <>
            <HeadlampSimpleTable
                data={EDPComponents}
                errorMessage={error?.toString()}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
            />
        </>
    );
};
