import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { TableProps } from './types';

const {
    pluginLib: { React, Utils },
} = globalThis;

export const Table: React.FC<TableProps> = ({ data }): React.ReactElement => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const filteredData = React.useMemo(() => data && data.filter(el => el.spec.visible), [data]);
    const filterFunc = Utils.useFilterFunc();
    return (
        <HeadlampSimpleTable
            data={filteredData}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
