import { Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Table } from '../../../../components/Table';
import {
  CODEBASE_COMMON_BUILD_TOOLS,
  CODEBASE_COMMON_FRAMEWORKS,
  CODEBASE_COMMON_LANGUAGES,
} from '../../../../configs/codebase-mappings';
import { useCreateArgoApplication } from '../../../../k8s/Application/hooks/useCreateArgoApplication';
import { getDeployedVersion } from '../../../../k8s/Application/utils/getDeployedVersion';
import { editResource } from '../../../../k8s/common/editResource';
import { useCreateDeployPipelineRun } from '../../../../k8s/PipelineRun/hooks/useCreateDeployPipelineRun';
import { mapEvery } from '../../../../utils/loops/mapEvery';
import { useDataContext } from '../../providers/Data/hooks';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { EnrichedApplicationWithArgoApplication } from '../../types';
import { useColumns } from './hooks/useColumns';
import { useUpperColumns } from './hooks/useUpperColumns';
import { ApplicationsProps, ButtonsMap } from './types';

const parseTagLabelValue = (tag: string) => {
  if (tag.includes('::')) {
    const [label, value] = tag.split('::');
    return { value, label };
  } else {
    return { value: tag, label: undefined };
  }
};

const createApplicationPayload = (imageTag: string, customValues: boolean) => ({
  imageTag,
  customValues,
});

const newDeployPipelineRunNames = {
  generateName: {
    name: 'generateName',
    path: ['metadata', 'generateName'],
  },
  CDPipelineLabel: {
    name: 'CDPipelineLabel',
    path: ['metadata', 'labels', 'app.edp.epam.com/cdpipeline'],
  },
  stageLabel: {
    name: 'stageLabel',
    path: ['metadata', 'labels', 'app.edp.epam.com/cdstage'],
  },
  pipelineTypeLabel: {
    name: 'pipelineTypeLabel',
    path: ['metadata', 'labels', 'app.edp.epam.com/pipelinetype'],
  },
  applicationsPayloadParam: {
    name: 'applicationsPayloadParam',
    path: ['spec', 'params', '0'],
  },
  stageParam: {
    name: 'stageParam',
    path: ['spec', 'params', '1'],
  },
  CDPipelineParam: {
    name: 'CDPipelineParam',
    path: ['spec', 'params', '2'],
  },
  kubeConfigSecretParam: {
    name: 'kubeConfigSecretParam',
    path: ['spec', 'params', '3'],
  },
};

export const Applications = ({
  enrichedApplicationsWithArgoApplications,
  latestDeployPipelineRunIsRunning,
}: ApplicationsProps) => {
  const { CDPipeline } = useDataContext();
  const {
    stage: { data: stage },
    deployPipelineRunTemplate: { data: deployPipelineRunTemplate },
  } = useDynamicDataContext();
  const { getValues, setValue, resetField, trigger } = useFormContext();
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAllClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = enrichedApplicationsWithArgoApplications.map(
          ({
            application: {
              metadata: { name },
            },
          }) => name
        );
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [enrichedApplicationsWithArgoApplications]
  );

  const handleSelectRowClick = React.useCallback(
    (event: React.MouseEvent<unknown>, row: EnrichedApplicationWithArgoApplication) => {
      const name = row.application.metadata.name;
      const selectedIndex = selected.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    },
    [selected]
  );

  const columns = useColumns(handleSelectRowClick, selected);

  const enrichedApplicationsByApplicationName = React.useMemo(() => {
    return (
      enrichedApplicationsWithArgoApplications &&
      enrichedApplicationsWithArgoApplications.reduce((acc, cur) => {
        acc.set(cur.application.metadata.name, cur);
        return acc;
      }, new Map<string, EnrichedApplicationWithArgoApplication>())
    );
  }, [enrichedApplicationsWithArgoApplications]);

  const onLatestClick = React.useCallback(() => {
    for (const selectedApplication of selected) {
      const selectFieldName = `${selectedApplication}::image-tag`;
      resetField(selectFieldName);

      const imageStreamBySelectedApplication =
        enrichedApplicationsByApplicationName.get(selectedApplication)?.applicationImageStream;

      if (
        !imageStreamBySelectedApplication ||
        !imageStreamBySelectedApplication?.spec?.tags?.length
      ) {
        continue;
      }

      const imageStreamTag = imageStreamBySelectedApplication?.spec?.tags.at(-1).name;

      if (!imageStreamTag) {
        continue;
      }

      setValue(selectFieldName, `latest::${imageStreamTag}`, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [enrichedApplicationsByApplicationName, resetField, selected, setValue]);

  const onStableClick = React.useCallback(() => {
    for (const selectedApplication of selected) {
      const selectFieldName = `${selectedApplication}::image-tag`;
      resetField(selectFieldName);

      const imageStreamBySelectedApplication =
        enrichedApplicationsByApplicationName.get(
          selectedApplication
        )?.applicationVerifiedImageStream;

      if (
        !imageStreamBySelectedApplication ||
        !imageStreamBySelectedApplication?.spec?.tags?.length
      ) {
        continue;
      }

      const imageStreamTag = imageStreamBySelectedApplication?.spec?.tags.at(-1).name;

      if (!imageStreamTag) {
        continue;
      }

      setValue(selectFieldName, `stable::${imageStreamTag}`, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [enrichedApplicationsByApplicationName, resetField, selected, setValue]);

  const onValuesOverrideAllClick = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const boolean = event.target.checked;
      const selected: string[] = [];

      for (const application of enrichedApplicationsWithArgoApplications) {
        const selectFieldName = `${application.application.metadata.name}::values-override`;

        setValue(selectFieldName, boolean, {
          shouldValidate: true,
          shouldDirty: true,
        });

        if (boolean) {
          selected.push(application.application.metadata.name);
        }
      }

      setSelected(selected);
    },
    [enrichedApplicationsWithArgoApplications, setValue]
  );

  const {
    deleteArgoApplication,
    mutations: { argoApplicationDeleteMutation },
  } = useCreateArgoApplication();

  const { createDeployPipelineRun } = useCreateDeployPipelineRun({});

  const someArgoApplicationMutationIsLoading = React.useMemo(
    () => argoApplicationDeleteMutation.isLoading,
    [argoApplicationDeleteMutation]
  );

  const buttonsEnabledMap: ButtonsMap = React.useMemo(() => {
    if (!selected || !selected.length) {
      return null;
    }

    const map = selected.reduce((acc, selectedApplication) => {
      {
        const application =
          enrichedApplicationsByApplicationName.get(selectedApplication)?.application;
        const argoApplicationBySelectedApplication =
          enrichedApplicationsByApplicationName.get(selectedApplication)?.argoApplication;

        if (!argoApplicationBySelectedApplication) {
          acc.set(selectedApplication, {
            deploy: !latestDeployPipelineRunIsRunning && !someArgoApplicationMutationIsLoading,
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

        acc.set(selectedApplication, {
          deploy: !latestDeployPipelineRunIsRunning && !someArgoApplicationMutationIsLoading,
          uninstall: !!deployedVersion,
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
    selected,
    enrichedApplicationsByApplicationName,
    latestDeployPipelineRunIsRunning,
    someArgoApplicationMutationIsLoading,
  ]);

  const onDeployClick = React.useCallback(async () => {
    const values = getValues();
    const valid = await trigger();

    if (!valid) {
      return;
    }

    // todo: refactor this hardcode
    const newDeployPipelineRun = editResource(
      newDeployPipelineRunNames,
      deployPipelineRunTemplate,
      {
        generateName: `deploy-${CDPipeline.data.metadata.name}-${stage.spec.name}`,
        CDPipelineLabel: CDPipeline.data.metadata.name,
        stageLabel: stage.metadata.name,
        pipelineTypeLabel: 'deploy',
        applicationsPayloadParam: {
          name: 'APPLICATIONS_PAYLOAD',
          value: JSON.stringify(
            enrichedApplicationsWithArgoApplications
              .filter(({ application }) => selected.includes(application.metadata.name))
              .reduce((acc, cur) => {
                const appName = cur.application.metadata.name;
                const imageTagFieldValue = values[`${appName}::image-tag`];
                const valuesOverrideFieldValue = values[`${appName}::values-override`];

                const { value: tagValue } = parseTagLabelValue(imageTagFieldValue);

                acc[appName] = createApplicationPayload(tagValue, valuesOverrideFieldValue);
                return acc;
              }, {})
          ),
        },
        stageParam: {
          name: 'CDSTAGE',
          value: stage.spec.name,
        },
        CDPipelineParam: {
          name: 'CDPIPELINE',
          value: CDPipeline.data.metadata.name,
        },
        kubeConfigSecretParam: {
          name: 'KUBECONFIG_SECRET_NAME',
          value: stage.spec.clusterName,
        },
      }
    );

    await createDeployPipelineRun({ deployPipelineRun: newDeployPipelineRun });
  }, [
    CDPipeline,
    createDeployPipelineRun,
    deployPipelineRunTemplate,
    enrichedApplicationsWithArgoApplications,
    getValues,
    selected,
    stage,
    trigger,
  ]);

  const onUninstallClick = React.useCallback(async () => {
    for (const enrichedApplication of enrichedApplicationsWithArgoApplications) {
      const appName = enrichedApplication.application.metadata.name;

      if (!selected.includes(appName)) {
        continue;
      }

      const argoApplication = enrichedApplicationsByApplicationName.get(appName)?.argoApplication;

      await deleteArgoApplication({
        argoApplication,
      });
    }
  }, [
    deleteArgoApplication,
    enrichedApplicationsByApplicationName,
    enrichedApplicationsWithArgoApplications,
    selected,
  ]);

  const upperColumns = useUpperColumns({
    selected,
    buttonsEnabledMap,
    onDeployClick,
    onUninstallClick,
    onLatestClick,
    onStableClick,
    onValuesOverrideAllClick,
    isDeployLoading: latestDeployPipelineRunIsRunning,
  });

  return (
    <>
      <Grid container spacing={2} justifyContent={'flex-end'}>
        <Grid item xs={12}>
          <Table<EnrichedApplicationWithArgoApplication>
            data={enrichedApplicationsWithArgoApplications}
            isLoading={enrichedApplicationsWithArgoApplications === null}
            columns={columns}
            upperColumns={upperColumns}
            handleSelectRowClick={handleSelectRowClick}
            handleSelectAllClick={handleSelectAllClick}
            selected={selected}
            isSelected={(row) => selected.indexOf(row.application.metadata.name) !== -1}
          />
        </Grid>
      </Grid>
    </>
  );
};
