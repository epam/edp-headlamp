import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../configs/codebase-mappings';
import { getDeployedVersion } from '../../../../k8s/groups/ArgoCD/Application/utils/getDeployedVersion';
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
  const baseDefaultValues = React.useMemo(() => {
    const values = (enrichedApplicationsWithArgoApplications || []).reduce<
      Record<string, boolean | string>
    >(
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

        return acc;
      },
      {
        [ALL_VALUES_OVERRIDE_KEY]: false,
      }
    );

    // Set ALL_VALUES_OVERRIDE_KEY based on whether all applications have values override enabled
    const allAppsHaveValuesOverride =
      enrichedApplicationsWithArgoApplications.length > 0 &&
      enrichedApplicationsWithArgoApplications.every((app) => {
        return app.argoApplication ? Object.hasOwn(app.argoApplication?.spec, 'sources') : false;
      });

    values[ALL_VALUES_OVERRIDE_KEY] = allAppsHaveValuesOverride;

    return values;
  }, [enrichedApplicationsWithArgoApplications]);

  const formState = useForm({
    defaultValues: baseDefaultValues,
  });

  const { reset } = formState;
  const hasInitialized = React.useRef(false);

  // Reset form with default values only on initial mount
  React.useEffect(() => {
    if (!hasInitialized.current && Object.keys(baseDefaultValues).length > 0) {
      reset(baseDefaultValues);
      hasInitialized.current = true;
    }
  }, [baseDefaultValues, reset]);

  return (
    <FormProvider {...formState}>
      <Applications
        enrichedApplicationsWithArgoApplications={enrichedApplicationsWithArgoApplications}
        latestDeployPipelineRunIsRunning={latestDeployPipelineRunIsRunning}
        latestCleanPipelineRunIsRunning={latestCleanPipelineRunIsRunning}
      />
    </FormProvider>
  );
};
