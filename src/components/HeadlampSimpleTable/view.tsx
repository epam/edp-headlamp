import { HeadlampSimpleTableProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { SimpleTable } = CommonComponents;

export const HeadlampSimpleTable: React.FC<HeadlampSimpleTableProps> = (
    props
): React.ReactElement => {
    return <SimpleTable {...props} />;
};
