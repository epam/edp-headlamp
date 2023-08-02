import { NameValueTable } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { useCDPipelineStageContext } from '../../providers/CDPipelineStage/hooks';
import { useRows } from './hooks/useRows';

export const GeneralInfo = () => {
    const { stage } = useCDPipelineStageContext();
    const rows = useRows(stage);

    return <NameValueTable rows={rows} />;
};
