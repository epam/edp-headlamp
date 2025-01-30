import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../../configs/codebase-mappings';
import { getDeployedVersion } from '../../../../../k8s/groups/ArgoCD/Application/utils/getDeployedVersion';
import { mapEvery } from '../../../../../utils/loops/mapEvery';
import { IMAGE_TAG_POSTFIX } from '../../../constants';
import { EnrichedApplicationWithArgoApplication } from '../../../types';
import { ButtonsMap } from '../types';

export const useButtonsEnabledMap = ({
  enrichedApplicationsWithArgoApplications,
  enrichedApplicationsByApplicationName,
  latestDeployPipelineRunIsRunning,
  someArgoApplicationMutationIsLoading,
}: {
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
  enrichedApplicationsByApplicationName: Map<string, EnrichedApplicationWithArgoApplication>;
  latestDeployPipelineRunIsRunning: boolean;
  someArgoApplicationMutationIsLoading: boolean;
}) => {
  const { watch } = useFormContext();

  const values = watch();
  const applications = enrichedApplicationsWithArgoApplications?.map(
    ({ application }) => application.metadata.name
  );

  return React.useMemo(() => {
    if (!applications || !applications.length) {
      return {
        deploy: false,
        uninstall: false,
      };
    }

    const selectedImageTagsValues = Object.entries(values).filter(([key, value]) => {
      if (!key.includes(IMAGE_TAG_POSTFIX)) {
        return false;
      }

      const appName = key.split('::')[0];
      return applications.includes(appName) && !!value;
    });

    const allAppVersionsAreSelected =
      selectedImageTagsValues?.length === enrichedApplicationsWithArgoApplications?.length;

    const map = applications.reduce((acc, appName) => {
      {
        const application = enrichedApplicationsByApplicationName.get(appName)?.application;
        const argoApplicationBySelectedApplication =
          enrichedApplicationsByApplicationName.get(appName)?.argoApplication;

        if (!argoApplicationBySelectedApplication) {
          acc.set(appName, {
            deploy:
              allAppVersionsAreSelected &&
              !latestDeployPipelineRunIsRunning &&
              !someArgoApplicationMutationIsLoading,
            uninstall: false,
          });
          return acc;
        }

        const isHelm =
          application?.spec?.lang === CODEBASE_COMMON_LANGUAGES.HELM &&
          application?.spec?.framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
          application?.spec?.buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM;

        const withValuesOverride = argoApplicationBySelectedApplication
          ? Object.hasOwn(argoApplicationBySelectedApplication?.spec, 'sources')
          : false;

        const deployedVersion = getDeployedVersion(
          withValuesOverride,
          isHelm,
          argoApplicationBySelectedApplication
        );

        acc.set(appName, {
          deploy:
            allAppVersionsAreSelected &&
            !latestDeployPipelineRunIsRunning &&
            !someArgoApplicationMutationIsLoading,
          uninstall: !!deployedVersion && !latestDeployPipelineRunIsRunning,
        });
        return acc;
      }
    }, new Map<string, ButtonsMap>());

    const deployBoolean = mapEvery(map, (value) => value.deploy);

    const uninstallBoolean = mapEvery(map, (value) => value.uninstall);

    return {
      deploy: deployBoolean,
      uninstall: uninstallBoolean,
    };
  }, [
    applications,
    values,
    enrichedApplicationsWithArgoApplications?.length,
    enrichedApplicationsByApplicationName,
    latestDeployPipelineRunIsRunning,
    someArgoApplicationMutationIsLoading,
  ]);
};
