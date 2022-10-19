import { pluginLib, React } from '../../plugin.globals';
import ErrorBoundary from '../ErrorBoundary/view';
import { HeadlampSimpleTable } from '../HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { LibraryListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const LibraryList = ({ data }: LibraryListProps): React.ReactElement => {
    const columns = useColumns();

    const filterFunc = useFilterFunc();
    return (
        <ErrorBoundary>
            <HeadlampSimpleTable
                data={data}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
                defaultSortingColumn={5}
            />
        </ErrorBoundary>
    );
};
