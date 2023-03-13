import ErrorBoundary from '../../../../components/ErrorBoundary';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { CiTools } from '../../../../icons/sprites/CiTools';
import { Resources } from '../../../../icons/sprites/Resources';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { ComponentListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const ComponentList = ({ components }: ComponentListProps): React.ReactElement => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();

    return (
        <ErrorBoundary>
            <Resources />
            <CiTools />
            <HeadlampSimpleTable
                data={components}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
            />
        </ErrorBoundary>
    );
};
