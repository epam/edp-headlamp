import { UseQueryOptions } from 'react-query';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { GitServerKubeObjectInterface } from '../types';
import { useGitServerListQuery } from './useGitServerListQuery';

interface UseGitServerListQueryProps {
  props: {
    codebaseGitServer: string;
  };
  options?: UseQueryOptions<
    KubeObjectListInterface<GitServerKubeObjectInterface>,
    Error,
    GitServerKubeObjectInterface
  >;
}

export const useGitServerByCodebaseQuery = ({ props, options }: UseGitServerListQueryProps) => {
  const { codebaseGitServer } = props;

  return useGitServerListQuery<GitServerKubeObjectInterface>({
    options: {
      select: (data) =>
        data && data?.items.length
          ? data?.items.filter((el) => el.metadata.name === codebaseGitServer)?.[0]
          : null,
      ...options,
      enabled: options?.enabled && !!codebaseGitServer,
    },
  });
};
