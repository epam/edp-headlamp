import ErrorBoundary from '../../../../components/ErrorBoundary';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { ComponentListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const ComponentList = ({ components, type }: ComponentListProps): React.ReactElement => {
    const columns = useColumns(type);
    const filterFunc = useFilterFunc();

    return (
        <ErrorBoundary>
            <HeadlampSimpleTable
                data={components}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
            />
        </ErrorBoundary>
    );
};
