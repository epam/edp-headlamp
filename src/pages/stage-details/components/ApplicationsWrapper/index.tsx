import React from 'react';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../configs/codebase-mappings';
import { getDeployedVersion } from '../../../../k8s/groups/ArgoCD/Application/utils/getDeployedVersion';
import { FormContextProvider } from '../../../../providers/Form';
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
  latestCleanPipelineRunIsRunning,
}: ApplicationsProps) => {
  const baseDefaultValues = React.useMemo(
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

          acc[`${name}${VALUES_OVERRIDE_POSTFIX}`] = withValuesOverride;

          if (deployedVersion !== 'NaN') {
            acc[`${name}${IMAGE_TAG_POSTFIX}`] = deployedVersion;
          }

          acc[ALL_VALUES_OVERRIDE_KEY] = withValuesOverride;

          return acc;
        },
        {
          [ALL_VALUES_OVERRIDE_KEY]: false,
        }
      ),
    [enrichedApplicationsWithArgoApplications]
  );

  return (
    <FormContextProvider
      formSettings={{
        defaultValues: baseDefaultValues,
        mode: 'onBlur',
      }}
    >
      <Applications
        enrichedApplicationsWithArgoApplications={enrichedApplicationsWithArgoApplications}
        latestDeployPipelineRunIsRunning={latestDeployPipelineRunIsRunning}
        latestCleanPipelineRunIsRunning={latestCleanPipelineRunIsRunning}
      />
    </FormContextProvider>
  );
};
