import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCDPipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_LIST } from '../requestKeys';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const useCDPipelineListQuery = <
    ReturnType = KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>
>(
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<KubeObjectListInterface<EDPCDPipelineKubeObjectInterface>, Error, ReturnType>(
        REQUEST_KEY_QUERY_CD_PIPELINE_LIST,
        () => EDPCDPipelineKubeObject.getList(),
        options
    );
};
