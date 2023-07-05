import { Utils } from '@kinvolk/headlamp-plugin/lib';
import { HeadlampSimpleTable } from '../../../../components/HeadlampSimpleTable';
import { Resources } from '../../../../icons/sprites/Resources';
import { useColumns } from './hooks/useColumns';
import { ComponentListProps } from './types';

export const ComponentList = ({ components, error }: ComponentListProps) => {
    const columns = useColumns();
    const filterFunc = Utils.useFilterFunc();
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
