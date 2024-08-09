import React from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../../hooks/useResourceRequestStatusMessages';
import { editResource } from '../../../../../k8s/common/editResource';
import { useCreateCleanPipelineRun } from '../../../../../k8s/groups/Tekton/PipelineRun/hooks/useCreateCleanPipelineRun';
import { useCreateDeployPipelineRun } from '../../../../../k8s/groups/Tekton/PipelineRun/hooks/useCreateDeployPipelineRun';
import {
  PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE,
  PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE,
  PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE,
} from '../../../../../k8s/groups/Tekton/PipelineRun/labels';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { CONFIRM_DIALOG_NAME } from '../../../../../widgets/ConfirmModal/constants';
import { IMAGE_TAG_POSTFIX, VALUES_OVERRIDE_POSTFIX } from '../../../constants';
import { useDataContext } from '../../../providers/Data/hooks';
import { useDynamicDataContext } from '../../../providers/DynamicData/hooks';
import { EnrichedApplicationWithArgoApplication } from '../../../types';

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
    path: ['metadata', 'labels', PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE],
  },
  stageLabel: {
    name: 'stageLabel',
    path: ['metadata', 'labels', PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE],
  },
  pipelineTypeLabel: {
    name: 'pipelineTypeLabel',
    path: ['metadata', 'labels', PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE],
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

const newCleanPipelineRunNames = {
  generateName: {
    name: 'generateName',
    path: ['metadata', 'generateName'],
  },
  CDPipelineLabel: {
    name: 'CDPipelineLabel',
    path: ['metadata', 'labels', PIPELINE_RUN_LABEL_SELECTOR_CDPIPELINE],
  },
  stageLabel: {
    name: 'stageLabel',
    path: ['metadata', 'labels', PIPELINE_RUN_LABEL_SELECTOR_CDSTAGE],
  },
  pipelineTypeLabel: {
    name: 'pipelineTypeLabel',
    path: ['metadata', 'labels', PIPELINE_RUN_LABEL_SELECTOR_PIPELINE_TYPE],
  },
  stageParam: {
    name: 'stageParam',
    path: ['spec', 'params', '0'],
  },
  CDPipelineParam: {
    name: 'CDPipelineParam',
    path: ['spec', 'params', '1'],
  },
};

export const useConfigurationHandlers = ({
  values,
  selected,
  setSelected,
  enrichedApplicationsByApplicationName,
  enrichedApplicationsWithArgoApplications,
  setDeleteDialogOpen,
}: {
  values: FieldValues;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  enrichedApplicationsByApplicationName: Map<string, EnrichedApplicationWithArgoApplication>;
  enrichedApplicationsWithArgoApplications: EnrichedApplicationWithArgoApplication[];
  setDeleteDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showRequestErrorMessage } = useRequestStatusMessages();
  const { CDPipeline } = useDataContext();
  const {
    stage: { data: stage },
    deployPipelineRunTemplate: { data: deployPipelineRunTemplate },
    cleanPipelineRunTemplate: { data: cleanPipelineRunTemplate },
  } = useDynamicDataContext();

  const { setValue, resetField, trigger } = useFormContext();

  const { createDeployPipelineRun } = useCreateDeployPipelineRun({});
  const { createCleanPipelineRun } = useCreateCleanPipelineRun({});

  const { setDialog } = useDialogContext();

  const handleClickLatest = React.useCallback(() => {
    for (const { application } of enrichedApplicationsWithArgoApplications) {
      const appName = application.metadata.name;
      const selectFieldName = `${appName}${IMAGE_TAG_POSTFIX}`;
      resetField(selectFieldName);

      const imageStreamBySelectedApplication =
        enrichedApplicationsByApplicationName.get(appName)?.applicationImageStream;

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
  }, [
    enrichedApplicationsByApplicationName,
    enrichedApplicationsWithArgoApplications,
    resetField,
    setValue,
  ]);

  const handleClickStable = React.useCallback(() => {
    for (const { application } of enrichedApplicationsWithArgoApplications) {
      const appName = application.metadata.name;
      const selectFieldName = `${appName}${IMAGE_TAG_POSTFIX}`;
      resetField(selectFieldName);

      const imageStreamBySelectedApplication =
        enrichedApplicationsByApplicationName.get(appName)?.applicationVerifiedImageStream;

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
  }, [
    enrichedApplicationsByApplicationName,
    enrichedApplicationsWithArgoApplications,
    resetField,
    setValue,
  ]);

  const handleClickOverrideValuesAll = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const boolean = event.target.value;

      for (const application of enrichedApplicationsWithArgoApplications) {
        const selectFieldName = `${application.application.metadata.name}${VALUES_OVERRIDE_POSTFIX}`;

        setValue(selectFieldName, boolean, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [enrichedApplicationsWithArgoApplications, setValue]
  );

  const handleClickSelectAll = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      paginatedItems: EnrichedApplicationWithArgoApplication[]
    ) => {
      if (event.target.checked) {
        const newSelected = paginatedItems.map(
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
    [setSelected]
  );

  const handleClickSelectRow = React.useCallback(
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
    [selected, setSelected]
  );

  const handleClickDeploy = React.useCallback(async () => {
    const valid = await trigger();

    if (!valid) {
      return;
    }

    const appPayload = enrichedApplicationsWithArgoApplications.reduce((acc, cur) => {
      const appName = cur.application.metadata.name;
      const imageTagFieldValue = values[`${appName}${IMAGE_TAG_POSTFIX}`];
      const valuesOverrideFieldValue = values[`${appName}${VALUES_OVERRIDE_POSTFIX}`];

      const { value: tagValue } = parseTagLabelValue(imageTagFieldValue);

      acc[appName] = createApplicationPayload(tagValue, valuesOverrideFieldValue);
      return acc;
    }, {});

    // todo: refactor this hardcode
    const newDeployPipelineRun = editResource(
      newDeployPipelineRunNames,
      deployPipelineRunTemplate,
      {
        generateName: `deploy-${CDPipeline.data.metadata.name}-${stage.spec.name}`,
        CDPipelineLabel: CDPipeline.data.metadata.name,
        stageLabel: stage.metadata.name,
        applicationsPayloadParam: {
          name: 'APPLICATIONS_PAYLOAD',
          value: JSON.stringify(appPayload),
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
    CDPipeline.data,
    createDeployPipelineRun,
    deployPipelineRunTemplate,
    enrichedApplicationsWithArgoApplications,
    stage.metadata.name,
    stage.spec.clusterName,
    stage.spec.name,
    trigger,
    values,
  ]);

  const handleClean = React.useCallback(async () => {
    if (!cleanPipelineRunTemplate) {
      showRequestErrorMessage(CRUD_TYPES.CREATE, {
        customMessage: 'Clean PipelineRun template is not found.',
        entityName: 'Clean PipelineRun',
      });

      return;
    }

    const newCleanPipelineRun = editResource(newCleanPipelineRunNames, cleanPipelineRunTemplate, {
      generateName: `clean-${CDPipeline.data.metadata.name}-${stage.spec.name}-`,
      CDPipelineLabel: CDPipeline.data.metadata.name,
      stageLabel: stage.metadata.name,
      pipelineTypeLabel: 'clean',
      stageParam: {
        name: 'CDSTAGE',
        value: stage.spec.name,
      },
      CDPipelineParam: {
        name: 'CDPIPELINE',
        value: CDPipeline.data.metadata.name,
      },
    });

    await createCleanPipelineRun({ cleanPipelineRun: newCleanPipelineRun });
  }, [
    CDPipeline.data.metadata.name,
    cleanPipelineRunTemplate,
    createCleanPipelineRun,
    showRequestErrorMessage,
    stage.metadata.name,
    stage.spec.name,
  ]);

  const handleClickClean = React.useCallback(async () => {
    setDialog({
      modalName: CONFIRM_DIALOG_NAME,
      forwardedProps: {
        text: 'Are you sure you want to clean up the environment?',
        actionCallback: () => handleClean(),
      },
    });
  }, [handleClean, setDialog]);

  const handleClickUninstall = React.useCallback(async () => {
    setDeleteDialogOpen(true);
  }, [setDeleteDialogOpen]);

  return {
    handleClickDeploy,
    handleClickClean,
    handleClickUninstall,
    handleClickSelectRow,
    handleClickSelectAll,
    handleClickOverrideValuesAll,
    handleClickStable,
    handleClickLatest,
  };
};
