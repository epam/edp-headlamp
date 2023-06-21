import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { CDPipelineListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const CDPipelineList = ({ CDPipelines, error }: CDPipelineListProps) => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={CDPipelines}
            errorMessage={error?.toString()}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
