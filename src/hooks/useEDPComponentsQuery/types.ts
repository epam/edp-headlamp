import { UseQueryResult } from 'react-query';
import { EDPComponentKubeObjectInterface } from '../../k8s/EDPComponent/types';
import { KubeObjectListInterface } from '../../types/k8s';

export interface UseEDPComponentsQueryProps {
    namespace: string;
}

export type UseEDPComponentsQueryReturnType = UseQueryResult<
    KubeObjectListInterface<EDPComponentKubeObjectInterface>,
    Error
>;
