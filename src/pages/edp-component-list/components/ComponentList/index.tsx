import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { Resources } from '../../../../icons/sprites/Resources';
import { pluginLib, React } from '../../../../plugin.globals';
import { useColumns } from './hooks/useColumns';
import { ComponentListProps } from './types';

const {
    Utils: { useFilterFunc },
} = pluginLib;

export const ComponentList = ({ components, error }: ComponentListProps) => {
    const columns = useColumns();
    const filterFunc = useFilterFunc();
    return (
        <>
            <Resources />
            <HeadlampSimpleTable
                data={components}
                errorMessage={error?.toString()}
                columns={columns}
                rowsPerPage={[15, 25, 50]}
                filterFunction={filterFunc}
            />
        </>
    );
};
