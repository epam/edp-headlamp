import { MetadataTable } from '../../../../components/MetadataTable';
import { React } from '../../../../plugin.globals';
import { useRows } from './hooks/useRows';
import { MetadataTableProps } from './types';

export const GitServerMetadataTable = ({ gitServerData }: MetadataTableProps) => {
    const { metadata } = gitServerData;
    const rows = useRows(metadata);

    return <MetadataTable rows={rows} />;
};
