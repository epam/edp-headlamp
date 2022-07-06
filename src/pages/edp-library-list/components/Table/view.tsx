import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { TableProps } from './types';

const {
    pluginLib: { React, Utils },
} = globalThis;
const { useFilterFunc } = Utils;

export const Table: React.FC<TableProps> = ({ data }): React.ReactElement => {
    const columns = useColumns();

    const filterFunc = useFilterFunc();
    return (
        <HeadlampSimpleTable
            data={data}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
            defaultSortingColumn={5}
        />
    );
};
