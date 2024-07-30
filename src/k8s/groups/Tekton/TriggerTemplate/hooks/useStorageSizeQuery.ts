import { CodebaseKubeObjectInterface } from '../../../EDP/Codebase/types';
import { useGitServerByCodebaseQuery } from '../../../EDP/GitServer/hooks/useGitServerByCodebaseQuery';
import { useTriggerTemplateListQuery } from './useTriggerTemplateListQuery';

export const useStorageSizeQuery = (codebase: CodebaseKubeObjectInterface) => {
  const { data: gitServerByCodebase } = useGitServerByCodebaseQuery({
    props: { codebaseGitServer: codebase?.spec.gitServer },
  });

  return useTriggerTemplateListQuery<string>({
    options: {
      select: (data) => {
        const buildTriggerTemplate = data?.items.find(
          (el) => el.metadata.name === `${gitServerByCodebase?.spec?.gitProvider}-build-template`
        );
        return buildTriggerTemplate?.spec?.resourcetemplates?.[0]?.spec?.workspaces?.[0]
          ?.volumeClaimTemplate?.spec?.resources?.requests?.storage;
      },
    },
  });
};
