import { pluginLib, React } from '../../plugin.globals';
import { HeadlampSimpleTable } from '../HeadlampSimpleTable';
import { useColumns } from './hooks/useColumns';
import { AutotestListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const AutotestList = ({ autotests }: AutotestListProps): React.ReactElement => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <HeadlampSimpleTable
            data={autotests}
            columns={columns}
            rowsPerPage={[15, 25, 50]}
            filterFunction={filterFunc}
        />
    );
};
