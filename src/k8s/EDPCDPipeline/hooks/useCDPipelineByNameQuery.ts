import { useQuery, UseQueryOptions } from 'react-query';
import { EDPCDPipelineKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME } from '../requestKeys';
import { EDPCDPipelineKubeObjectInterface } from '../types';

export const useCDPipelineByNameQuery = <ReturnType = EDPCDPipelineKubeObjectInterface>(
    name: string,
    options?: UseQueryOptions<EDPCDPipelineKubeObjectInterface, Error, ReturnType>
) => {
    return useQuery<EDPCDPipelineKubeObjectInterface, Error, ReturnType>(
        [REQUEST_KEY_QUERY_CD_PIPELINE_BY_NAME, name],
        () => EDPCDPipelineKubeObject.getItemByName(name),
        {
            ...options,
            enabled: !!name,
        }
    );
};
