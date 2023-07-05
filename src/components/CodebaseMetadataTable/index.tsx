import { MetadataTable } from '../MetadataTable';
import { useRows } from './hooks/useRows';
import { CodebaseMetadataTableProps } from './types';

export const CodebaseMetadataTable = ({ codebaseData }: CodebaseMetadataTableProps) => {
    const { metadata } = codebaseData;
    const rows = useRows(metadata);

    return <MetadataTable rows={rows} />;
};
