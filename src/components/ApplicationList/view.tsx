import { pluginLib, React } from '../../plugin.globals';
import { HeadlampSimpleTable } from '../HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { ApplicationListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const ApplicationList: React.FC<ApplicationListProps> = ({
    applications,
}): React.ReactElement => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={applications}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
