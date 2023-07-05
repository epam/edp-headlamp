import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { GitServerListProps } from './types';

export const GitServerList = ({ gitServers, error }: GitServerListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();

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
