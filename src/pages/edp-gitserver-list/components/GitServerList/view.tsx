import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { GitServerListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const GitServerList = ({ gitServers, error }: GitServerListProps) => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={gitServers}
            errorMessage={error?.toString()}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
