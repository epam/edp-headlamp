import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCDPipelineStageKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_STAGE_LIST } from '../requestKeys';
import { EDPCDPipelineStageKubeObjectInterface } from '../types';

export const useCDPipelineStageListQuery = <
    ReturnType = KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<
        KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
        Error,
        ReturnType
    >(
        REQUEST_KEY_QUERY_CD_PIPELINE_STAGE_LIST,
        () => EDPCDPipelineStageKubeObject.getList(),
        options
    );
};
