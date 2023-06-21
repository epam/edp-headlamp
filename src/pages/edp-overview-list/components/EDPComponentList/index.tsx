import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { useStyles } from './styles';
import { EDPComponentListProps } from './types';

const { Utils } = pluginLib;

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
