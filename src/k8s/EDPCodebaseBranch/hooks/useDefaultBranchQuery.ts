import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../types/k8s';
import { EDPCodebaseBranchKubeObjectInterface } from '../types';
import { useCodebaseBranchesByCodebaseNameLabelQuery } from './useCodebaseBranchesByCodebaseNameLabelQuery';

interface UseDefaultBranchQueryProps {
  props: {
    codebaseName: string;
    defaultBranchName: string;
    namespace?: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<EDPCodebaseBranchKubeObjectInterface>,
    Error,
    EDPCodebaseBranchKubeObjectInterface
  >;
}

export const useDefaultBranchQuery = ({
  props: { defaultBranchName, codebaseName },
  options,
}: UseDefaultBranchQueryProps) => {
  return useCodebaseBranchesByCodebaseNameLabelQuery<EDPCodebaseBranchKubeObjectInterface>({
    props: {
      codebaseName,
    },
    options: {
      ...options,
      select: (data) => {
        return data?.items.filter(
          ({ spec: { branchName } }) => branchName === defaultBranchName
        )?.[0];
      },
      enabled: !!codebaseName && !!defaultBranchName,
    },
  });
};
