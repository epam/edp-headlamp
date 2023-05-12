import { useQuery, UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCodebaseBranchKubeObject } from '../index';
import { REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME } from '../requestKeys';
import { EDPCodebaseBranchKubeObjectInterface } from '../types';

export const useCodebaseBranchesByCodebaseNameLabelQuery = <
    ReturnType = KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>
>(
    codebaseName: string,
    options?: UseQueryOptions<
        KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>,
        Error,
        ReturnType
    >
) => {
    return useQuery<
        KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>,
        Error,
        ReturnType
    >(
        [REQUEST_KEY_QUERY_CODEBASE_BRANCH_LIST_BY_CODEBASE_NAME, codebaseName],
        () => EDPCodebaseBranchKubeObject.getListByCodebaseName(codebaseName),
        options
    );
};
