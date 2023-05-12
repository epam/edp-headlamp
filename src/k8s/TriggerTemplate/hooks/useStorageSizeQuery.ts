import { EDPCodebaseKubeObjectInterface } from '../../EDPCodebase/types';
import { useGitServerByCodebaseQuery } from '../../EDPGitServer/hooks/useGitServerByCodebaseQuery';
import { useTriggerTemplateListQuery } from './useTriggerTemplateListQuery';

export const useStorageSizeQuery = (codebase: EDPCodebaseKubeObjectInterface) => {
    const { data: gitServerByCodebase } = useGitServerByCodebaseQuery(codebase);

    return useTriggerTemplateListQuery<string>({
        select: data => {
            const buildTriggerTemplate = data?.items.find(
                el =>
                    el.metadata.name === `${gitServerByCodebase?.spec?.gitProvider}-build-template`
            );
            return buildTriggerTemplate?.spec?.resourcetemplates?.[0]?.spec?.workspaces?.[0]
                ?.volumeClaimTemplate?.spec?.resources?.requests?.storage;
        },
    });
};
