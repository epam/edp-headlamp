import { React } from '../../../../../../plugin.globals';
import { HeadlampNameValueTable } from '../../../../../HeadlampNameValueTable';
import { useColumns } from './hooks/useColumns';
import { MetadataTableProps } from './types';

export const MetadataTable = ({ kubeObjectData }: MetadataTableProps): React.ReactElement => {
    const { metadata } = kubeObjectData;
    const columns = useColumns(metadata);

    return <HeadlampNameValueTable rows={columns} />;
};
