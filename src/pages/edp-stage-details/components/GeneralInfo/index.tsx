import React from 'react';
import { HeadlampNameValueTable } from '../../../../components/HeadlampNameValueTable';
import { useCDPipelineStageContext } from '../../providers/CDPipelineStage/hooks';
import { useRows } from './hooks/useRows';

export const GeneralInfo = () => {
    const { stage } = useCDPipelineStageContext();
    const rows = useRows(stage);

    return <HeadlampNameValueTable rows={rows} />;
};
