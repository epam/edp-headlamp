import { EDPCodebaseKubeObjectInterface } from '../../EDPCodebase/types';
import { EDPGitServerKubeObjectInterface } from '../types';
import { useGitServerListQuery } from './useGitServerListQuery';

export const useGitServerByCodebaseQuery = (codebase: EDPCodebaseKubeObjectInterface) => {
    return useGitServerListQuery<EDPGitServerKubeObjectInterface>({
        select: data =>
            data && data?.items.length
                ? data?.items.filter(el => el.metadata.name === codebase?.spec.gitServer)?.[0]
                : null,
    });
};
