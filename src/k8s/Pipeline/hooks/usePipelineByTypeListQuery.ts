import { useQuery, UseQueryOptions } from 'react-query';
import { PIPELINE_TYPES } from '../../../constants/pipelineTypes';
import { KubeObjectListInterface } from '../../../types/k8s';
import { PipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_PIPELINE_LIST_BY_TYPE } from '../requestKeys';
import { PipelineKubeObjectInterface } from '../types';

export const usePipelineByTypeListQuery = <
    ReturnType = KubeObjectListInterface<PipelineKubeObjectInterface>
>(
    pipelineType: PIPELINE_TYPES,
    options?: UseQueryOptions<
        KubeObjectListInterface<PipelineKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<PipelineKubeObjectInterface>, Error, ReturnType>(
        [REQUEST_KEY_QUERY_PIPELINE_LIST_BY_TYPE, pipelineType],
        () => PipelineKubeObject.getListByPipelineType(pipelineType),
        options
    );
};
