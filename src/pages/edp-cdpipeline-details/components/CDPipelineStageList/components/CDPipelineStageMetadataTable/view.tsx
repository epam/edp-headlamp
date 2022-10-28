import { MetadataTable } from '../../../../../../components/MetadataTable';
import { React } from '../../../../../../plugin.globals';
import { CurrentCDPipelineStageDataContext } from '../../view';
import { useRows } from './hooks/useRows';

export const CDPipelineStageMetadataTable = (): React.ReactElement => {
    const { metadata } = React.useContext(CurrentCDPipelineStageDataContext);
    const rows = useRows(metadata);

    return <MetadataTable rows={rows} />;
};
