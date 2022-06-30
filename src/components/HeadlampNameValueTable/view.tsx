import { HeadlampNameValueTableProps } from './types';

const {
    pluginLib: { React, CommonComponents },
} = globalThis;
const { NameValueTable } = CommonComponents;

export const HeadlampNameValueTable: React.FC<HeadlampNameValueTableProps> = (
    props
): React.ReactElement => {
    return <NameValueTable {...props} />;
};
