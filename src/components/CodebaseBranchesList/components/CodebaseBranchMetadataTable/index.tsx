import { React } from '../../../../plugin.globals';
import { MetadataTable } from '../../../MetadataTable';
import { useRows } from './hooks/useRows';
import { CodebaseBranchMetadataTableProps } from './types';

export const CodebaseBranchMetadataTable = ({
    codebaseBranchData,
}: CodebaseBranchMetadataTableProps): React.ReactElement => {
    const { metadata } = codebaseBranchData;
    const rows = useRows(metadata);

    return <MetadataTable rows={rows} />;
};
