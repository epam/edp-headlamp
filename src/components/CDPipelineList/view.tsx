import { pluginLib, React } from '../../plugin.globals';
import { HeadlampSimpleTable } from '../HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { CDPipelineListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const CDPipelineList: React.FC<CDPipelineListProps> = ({
    CDPipelines,
}): React.ReactElement => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={CDPipelines}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
