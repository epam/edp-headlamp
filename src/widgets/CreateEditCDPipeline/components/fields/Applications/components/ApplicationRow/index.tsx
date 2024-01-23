import { Icon } from '@iconify/react';
import { Button, Grid, useTheme } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { useCodebaseBranchesByCodebaseNameLabelQuery } from '../../../../../../../k8s/EDPCodebaseBranch/hooks/useCodebaseBranchesByCodebaseNameLabelQuery';
import { useSpecificDialogContext } from '../../../../../../../providers/Dialog/hooks';
import { FormCheckbox } from '../../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FormSelect } from '../../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { FieldEvent, FieldEventTarget } from '../../../../../../../types/forms';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../../names';
import {
  CreateEditCDPipelineDialogForwardedProps,
  CreateEditCDPipelineFormValues,
} from '../../../../../types';
import { createApplicationRowName } from '../../constants';
import { Application } from '../../types';
import { useStyles } from './styles';
import { ApplicationRowProps } from './types';

export const ApplicationRow = ({ application }: ApplicationRowProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const appName = application.metadata.name;

  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
    resetField,
  } = useFormContext<CreateEditCDPipelineFormValues>();

  const {
    forwardedProps: { CDPipelineData },
  } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );

  const [availableBranches, setAvailableBranches] = React.useState<
    Application['availableBranches']
  >([]);

  const { data: applicationBranchesList } = useCodebaseBranchesByCodebaseNameLabelQuery({
    props: {
      codebaseName: appName,
      namespace: CDPipelineData?.metadata.namespace,
    },
    options: {
      enabled: !!appName,
    },
  });
  const applicationsFieldValue = watch(CDPIPELINE_FORM_NAMES.applications.name);
  const applicationsBranchesFieldValue = watch(CDPIPELINE_FORM_NAMES.inputDockerStreams.name);
  const applicationsToPromoteFieldValue = watch(CDPIPELINE_FORM_NAMES.applicationsToPromote.name);
  const rowAppNameField = `${createApplicationRowName(appName)}-application-name`;
  // @ts-ignore
  const rowAppBranchField = `${createApplicationRowName(appName)}-application-branch`;
  // @ts-ignore
  const rowAppBranchFieldValue = watch(rowAppBranchField);
  const rowAppToPromoteField = `${createApplicationRowName(appName)}-application-to-promote`;

  const updateAppChosenBranch = React.useCallback(
    (availableBranches: Application['availableBranches']) => {
      if (!applicationsBranchesFieldValue || !applicationsBranchesFieldValue.length) {
        return;
      }

      const applicationAvailableBranchesSet = new Set(
        availableBranches.map(({ metadataBranchName }) => metadataBranchName)
      );

      for (const applicationBranch of applicationsBranchesFieldValue) {
        if (!applicationAvailableBranchesSet.has(applicationBranch)) {
          continue;
        }

        // @ts-ignore
        setValue(rowAppBranchField, applicationBranch);
      }
    },
    [applicationsBranchesFieldValue, rowAppBranchField, setValue]
  );

  const handleChangeApplicationBranch = React.useCallback(
    ({ value: newValue }: FieldEventTarget) => {
      const oldValue = rowAppBranchFieldValue;
      const newApplicationsBranches = [
        ...applicationsBranchesFieldValue.filter(el => el !== oldValue),
        newValue,
      ];

      setValue(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, newApplicationsBranches);
    },
    [applicationsBranchesFieldValue, rowAppBranchFieldValue, setValue]
  );

  const handleChangeApplicationToPromote = React.useCallback(
    ({ value: checkboxBoolean }: FieldEventTarget) => {
      const newApplicationsToPromote = checkboxBoolean
        ? [...applicationsToPromoteFieldValue, appName]
        : applicationsToPromoteFieldValue.filter(el => el !== appName);

      setValue(CDPIPELINE_FORM_NAMES.applicationsToPromote.name, newApplicationsToPromote);
    },
    [appName, applicationsToPromoteFieldValue, setValue]
  );

  const handleDeleteApplicationRow = React.useCallback(async () => {
    const newApplicationList = applicationsFieldValue.filter(el => el !== appName);
    const newInputDockerStreamsList = applicationsBranchesFieldValue.filter(
      el => el !== rowAppBranchFieldValue
    );
    setValue(CDPIPELINE_FORM_NAMES.applicationsToPromote.name, newApplicationList, {
      shouldDirty: true,
    });
    setValue(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, newInputDockerStreamsList, {
      shouldDirty: true,
    });
    setValue(CDPIPELINE_FORM_NAMES.applications.name, newApplicationList, {
      shouldDirty: true,
    });
    // @ts-ignore
    resetField(rowAppNameField);
    // @ts-ignore
    resetField(rowAppBranchField);
    // @ts-ignore
    resetField(rowAppToPromoteField);
  }, [
    appName,
    applicationsBranchesFieldValue,
    applicationsFieldValue,
    resetField,
    rowAppBranchField,
    rowAppBranchFieldValue,
    rowAppNameField,
    rowAppToPromoteField,
    setValue,
  ]);

  React.useEffect(() => {
    if (!applicationBranchesList) {
      return;
    }

    const branchesNames = applicationBranchesList.items.map(el => ({
      specBranchName: el.spec.branchName,
      metadataBranchName: el.metadata.name,
    }));
    setAvailableBranches(branchesNames);
    updateAppChosenBranch(branchesNames);
  }, [applicationBranchesList, updateAppChosenBranch]);

  return (
    <Grid item xs={12} className={classes.application}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <FormTextField
            {...register(
              // @ts-ignore
              rowAppNameField
            )}
            disabled
            defaultValue={appName}
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={4}>
          <FormSelect
            {...register(
              // @ts-ignore
              rowAppBranchField,
              {
                required: 'Select branch',
                onChange: ({ target: { name, value } }: FieldEvent) =>
                  handleChangeApplicationBranch({ name, value }),
              }
            )}
            placeholder={'Select application branch'}
            control={control}
            errors={errors}
            options={availableBranches.map(el => ({
              label: el.specBranchName,
              value: el.metadataBranchName,
            }))}
          />
        </Grid>
        <Grid item xs={3} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <FormCheckbox
            {...register(
              // @ts-ignore
              rowAppToPromoteField,
              {
                onChange: ({ target: { name, value } }: FieldEvent) =>
                  handleChangeApplicationToPromote({ name, value }),
              }
            )}
            defaultValue={CDPipelineData?.spec?.applicationsToPromote?.includes(appName)}
            label={<FormControlLabelWithTooltip label={'Promote in pipeline'} />}
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <Button
            type={'button'}
            size={'small'}
            component={'button'}
            style={{ minWidth: 0 }}
            onClick={handleDeleteApplicationRow}
          >
            <Icon icon={ICONS['BUCKET']} width={20} color={theme.palette.grey['500']} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
