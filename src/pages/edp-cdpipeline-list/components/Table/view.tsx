import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { TableProps } from './types';

const {
    pluginLib: { React, Utils },
} = globalThis;
const { useFilterFunc } = Utils;

export const Table: React.FC<TableProps> = ({ data }): React.ReactElement => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const filterFunc = useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={data}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
