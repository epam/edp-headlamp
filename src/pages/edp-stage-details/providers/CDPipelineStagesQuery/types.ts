import { UseQueryResult } from 'react-query';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { KubeObjectListInterface } from '../../../../types/k8s';

export interface CDPipelineStagesQueryContextProviderValue {
    stagesQuery: UseQueryResult<
        KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
        Error
    >;
}
