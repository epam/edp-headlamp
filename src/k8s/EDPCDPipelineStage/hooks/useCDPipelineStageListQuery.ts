import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { getDefaultNamespace } from '../../../utils/getDefaultNamespace';
import { EDPCDPipelineStageKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_STAGE_LIST } from '../requestKeys';
import { EDPCDPipelineStageKubeObjectInterface } from '../types';

interface UseCDPipelineStageListQueryProps<ReturnType> {
    props?: {
        namespace?: string;
    };
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
        Error,
        ReturnType
    >;
}

export const useCDPipelineStageListQuery = <
    ReturnType = KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>
>({
    props,
    options,
}: UseCDPipelineStageListQueryProps<ReturnType>) => {
    const namespace = props?.namespace || getDefaultNamespace();

    return useQuery<
        KubeObjectListInterface<EDPCDPipelineStageKubeObjectInterface>,
        Error,
        ReturnType
    >(
        REQUEST_KEY_QUERY_CD_PIPELINE_STAGE_LIST,
        () => EDPCDPipelineStageKubeObject.getList(namespace),
        options
    );
};
