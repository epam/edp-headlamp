import { React } from '../../plugin.globals';
import { MetadataTable } from '../MetadataTable';
import { useRows } from './hooks/useRows';
import { CodebaseMetadataTableProps } from './types';

export const CodebaseMetadataTable = ({
    codebaseData,
}: CodebaseMetadataTableProps): React.ReactElement => {
    const { metadata } = codebaseData;
    const rows = useRows(metadata);

    return <MetadataTable rows={rows} />;
};
