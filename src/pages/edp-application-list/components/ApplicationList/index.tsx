import ErrorBoundary from '../../../../components/ErrorBoundary';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { ApplicationListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const ApplicationList = ({ applications }: ApplicationListProps): React.ReactElement => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <ErrorBoundary>
            <HeadlampSimpleTable
                data={applications}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
            />
        </ErrorBoundary>
    );
};
