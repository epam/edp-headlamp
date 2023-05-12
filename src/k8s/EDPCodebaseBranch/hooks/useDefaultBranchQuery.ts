import { EDPCodebaseKubeObjectInterface } from '../../EDPCodebase/types';
import { EDPCodebaseBranchKubeObjectInterface } from '../types';
import { useCodebaseBranchesByCodebaseNameLabelQuery } from './useCodebaseBranchesByCodebaseNameLabelQuery';

export const useDefaultBranchQuery = (codebaseData: EDPCodebaseKubeObjectInterface) => {
    return useCodebaseBranchesByCodebaseNameLabelQuery<EDPCodebaseBranchKubeObjectInterface>(
        codebaseData.metadata.name,
        {
            select: data =>
                data?.items.filter(
                    ({ spec: { branchName } }) => branchName === codebaseData.spec.defaultBranch
                )?.[0],
        }
    );
};
