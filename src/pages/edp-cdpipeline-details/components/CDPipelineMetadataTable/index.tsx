import { MetadataTable } from '../../../../components/MetadataTable';
import { React } from '../../../../plugin.globals';
import { useRows } from './hooks/useRows';
import { CDPipelineMetadataTableProps } from './types';

export const CDPipelineMetadataTable = ({
    CDPipelineData,
}: CDPipelineMetadataTableProps): React.ReactElement => {
    const { metadata } = CDPipelineData;
    const rows = useRows(metadata);

    return <MetadataTable rows={rows} />;
};
