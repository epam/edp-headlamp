import React from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { CRUD_TYPES } from '../../../../../constants/crudTypes';
import { useRequestStatusMessages } from '../../../../../hooks/useResourceRequestStatusMessages';
import { useCreateCleanPipelineRun } from '../../../../../k8s/groups/Tekton/PipelineRun/hooks/useCreateCleanPipelineRun';
import { useCreateDeployPipelineRun } from '../../../../../k8s/groups/Tekton/PipelineRun/hooks/useCreateDeployPipelineRun';
import { createCleanPipelineRunInstance } from '../../../../../k8s/groups/Tekton/PipelineRun/utils/createCleanPipelineRunInstance';
import { createDeployPipelineRunInstance } from '../../../../../k8s/groups/Tekton/PipelineRun/utils/createDeployPipelineRunInstance';
import { useDialogContext } from '../../../../../providers/Dialog/hooks';
import { ConfirmDialog } from '../../../../../widgets/dialogs/Confirm';
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

    const appPayload = enrichedApplicationsWithArgoApplications.reduce<
      Record<
        string,
        {
          imageTag: string;
          customValues: boolean;
        }
      >
    >((acc, cur) => {
      const appName = cur.application.metadata.name;
      const imageTagFieldValue = values[`${appName}${IMAGE_TAG_POSTFIX}`] as string;
      const valuesOverrideFieldValue = values[`${appName}${VALUES_OVERRIDE_POSTFIX}`] as boolean;

      const { value: tagValue } = parseTagLabelValue(imageTagFieldValue);

      acc[appName] = createApplicationPayload(tagValue, valuesOverrideFieldValue);
      return acc;
    }, {});

    const newDeployPipelineRun = createDeployPipelineRunInstance({
      CDPipeline: CDPipeline.data,
      stage,
      pipelineRunTemplate: deployPipelineRunTemplate,
      appPayload,
    });

    await createDeployPipelineRun({ deployPipelineRun: newDeployPipelineRun });
  }, [
    CDPipeline.data,
    createDeployPipelineRun,
    deployPipelineRunTemplate,
    enrichedApplicationsWithArgoApplications,
    stage,
    trigger,
    values,
  ]);

  const handleClean = React.useCallback(async () => {
    if (!cleanPipelineRunTemplate) {
      showRequestErrorMessage(CRUD_TYPES.CREATE, {
        customMessage: {
          message: 'Clean PipelineRun template is not found.',
          options: {
            variant: 'error',
          },
        },
      });

      return;
    }

    const newCleanPipelineRun = createCleanPipelineRunInstance({
      CDPipeline: CDPipeline.data,
      stage,
      pipelineRunTemplate: cleanPipelineRunTemplate,
    });

    await createCleanPipelineRun({ cleanPipelineRun: newCleanPipelineRun });
  }, [
    CDPipeline.data,
    cleanPipelineRunTemplate,
    createCleanPipelineRun,
    showRequestErrorMessage,
    stage,
  ]);

  const handleClickClean = React.useCallback(async () => {
    setDialog(ConfirmDialog, {
      text: 'Are you sure you want to clean up the environment?',
      actionCallback: () => handleClean(),
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
