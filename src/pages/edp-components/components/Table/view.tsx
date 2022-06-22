import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { TableProps } from './types';

const {
    pluginLib: { React, CommonComponents, Utils },
} = window;
const { SimpleTable } = CommonComponents;

export const Table: React.FC<TableProps> = ({ data }): React.ReactElement => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const filteredData = React.useMemo(() => data && data.filter(el => el.spec.visible), [data]);
    const filterFunc = Utils.useFilterFunc();
    return (
        <SimpleTable
            data={filteredData}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
