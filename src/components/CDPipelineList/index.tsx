import { pluginLib, React } from '../../plugin.globals';
import ErrorBoundary from '../ErrorBoundary';
import { HeadlampSimpleTable } from '../HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { CDPipelineListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const CDPipelineList = ({ CDPipelines }: CDPipelineListProps): React.ReactElement => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <ErrorBoundary>
            <HeadlampSimpleTable
                data={CDPipelines}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
            />
        </ErrorBoundary>
    );
};
