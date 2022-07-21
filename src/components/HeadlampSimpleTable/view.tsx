import { pluginLib, React } from '../../plugin.globals';
import { HeadlampSimpleTableProps } from './types';

const { CommonComponents } = pluginLib;
const { SimpleTable } = CommonComponents;

export const HeadlampSimpleTable: React.FC<HeadlampSimpleTableProps> = (
    props
): React.ReactElement => {
    return <SimpleTable {...props} />;
};
