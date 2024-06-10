import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../configs/codebase-mappings';
import { getDeployedVersion } from '../../../../k8s/Application/utils/getDeployedVersion';
import {
  ALL_VALUES_OVERRIDE_KEY,
  IMAGE_TAG_POSTFIX,
  VALUES_OVERRIDE_POSTFIX,
} from '../../constants';
import { Applications } from '../Applications';
import { ApplicationsProps } from '../Applications/types';

export const ApplicationsWrapper = ({
  enrichedApplicationsWithArgoApplications,
  latestDeployPipelineRunIsRunning,
}: ApplicationsProps) => {
  const defaultValues = React.useMemo(
    () =>
      (enrichedApplicationsWithArgoApplications || []).reduce(
        (acc, cur) => {
          const {
            application: {
              spec: { lang, framework, buildTool },
              metadata: { name },
            },
            argoApplication,
          } = cur;

          const isHelm =
            lang === CODEBASE_COMMON_LANGUAGES.HELM &&
            framework === CODEBASE_COMMON_FRAMEWORKS.HELM &&
            buildTool === CODEBASE_COMMON_BUILD_TOOLS.HELM;

          const withValuesOverride = argoApplication
            ? Object.hasOwn(argoApplication?.spec, 'sources')
            : false;

          const deployedVersion = getDeployedVersion(withValuesOverride, isHelm, argoApplication);

          acc[`${name}${IMAGE_TAG_POSTFIX}`] = deployedVersion;
          acc[`${name}${VALUES_OVERRIDE_POSTFIX}`] = withValuesOverride;

          acc[ALL_VALUES_OVERRIDE_KEY] = withValuesOverride;

          return acc;
        },
        {
          [ALL_VALUES_OVERRIDE_KEY]: false,
        }
      ),
    [enrichedApplicationsWithArgoApplications]
  );

  const form = useForm({
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <Applications
        enrichedApplicationsWithArgoApplications={enrichedApplicationsWithArgoApplications}
        latestDeployPipelineRunIsRunning={latestDeployPipelineRunIsRunning}
      />
    </FormProvider>
  );
};
