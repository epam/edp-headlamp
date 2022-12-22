import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { EDPComponents } from '../../../../icons/sprites/EDPComponents';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { TableProps } from './types';

const { Utils } = pluginLib;

export const Table: React.FC<TableProps> = ({ data }): React.ReactElement => {
    const classes = useStyles();
    const columns = useColumns(classes);
    const filterFunc = Utils.useFilterFunc();

    return (
        <>
            <EDPComponents />
            <HeadlampSimpleTable
                data={data}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
            />
        </>
    );
};
