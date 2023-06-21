import { UseQueryResult } from 'react-query';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';

export interface CDPipelineContextProviderValue {
    CDPipelineQuery: UseQueryResult<EDPCDPipelineKubeObjectInterface, Error>;
}
