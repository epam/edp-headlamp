import { Icon } from '@iconify/react';
import { Button, Grid, useTheme } from '@mui/material';
import React from 'react';
import { LoadingWrapper } from '../../../../../../../../components/LoadingWrapper';
import { FORM_CONTROL_LABEL_HEIGHT } from '../../../../../../../../constants/ui';
import { ICONS } from '../../../../../../../../icons/iconify-icons-mapping';
import { useSortedCodebaseBranchesByCodebaseNameLabelQuery } from '../../../../../../../../k8s/groups/EDP/CodebaseBranch/hooks/useSortedCodebaseBranchesByCodebaseNameLabelQuery';
import { FormAutocompleteSingle } from '../../../../../../../../providers/Form/components/FormAutocompleteSingle';
import { FormTextField } from '../../../../../../../../providers/Form/components/FormTextField';
import { FieldEvent } from '../../../../../../../../types/forms';
import { ValueOf } from '../../../../../../../../types/global';
import { useTypedFormContext } from '../../../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES, NAMES } from '../../../../../names';
import { useCurrentDialog } from '../../../../../providers/CurrentDialog/hooks';
import { ApplicationRowType } from '../../types';
import { useStyles } from './styles';
import { ApplicationRowProps } from './types';

export const ApplicationRow = ({ application, index, removeRow }: ApplicationRowProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const appName = application?.metadata.name;

  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useTypedFormContext();

  const {
    props: { CDPipelineData },
  } = useCurrentDialog();

  const { data: applicationBranchesList, isLoading: applicationBranchesListIsLoading } =
    useSortedCodebaseBranchesByCodebaseNameLabelQuery(appName, CDPipelineData?.metadata.namespace);

  const rowAppNameField = `${CDPIPELINE_FORM_NAMES.applicationsFieldArray.name}.${index}.appName`;
  const rowAppBranchField = `${CDPIPELINE_FORM_NAMES.applicationsFieldArray.name}.${index}.appBranch`;

  const applicationsFieldArrayValue: ApplicationRowType[] = watch(
    CDPIPELINE_FORM_NAMES.applicationsFieldArray.name
  );
  const inputDockerStreamsValue: string[] = watch(CDPIPELINE_FORM_NAMES.inputDockerStreams.name);

  const handleDeleteApplicationRow = React.useCallback(() => {
    removeRow();

    const applicationsFieldArrayItemByAppName = applicationsFieldArrayValue.find(
      (el) => el.appName === appName
    );

    const newAppsList = applicationsFieldArrayValue
      .filter((el) => el.appName !== appName)
      .map((el) => el.appName);

    const newAppsBranchesList = inputDockerStreamsValue.filter(
      (el) => el !== applicationsFieldArrayItemByAppName?.appBranch
    );

    setValue(CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name, newAppsList, {
      shouldDirty: false,
    });

    setValue(CDPIPELINE_FORM_NAMES.applications.name, newAppsList, { shouldDirty: false });

    setValue(CDPIPELINE_FORM_NAMES.applicationsToPromote.name, newAppsList, { shouldDirty: false });

    setValue(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, newAppsBranchesList, {
      shouldDirty: false,
    });
  }, [appName, applicationsFieldArrayValue, inputDockerStreamsValue, removeRow, setValue]);

  const setDefaultValues = React.useCallback(() => {
    if (applicationBranchesListIsLoading || !applicationBranchesList?.length) {
      return;
    }

    const availableBranches = applicationBranchesList.map((el) => ({
      specBranchName: el.spec.branchName,
      metadataBranchName: el.metadata.name,
    }));

    let newBranchFieldValue = '';

    if (CDPipelineData?.spec.applications.includes(appName)) {
      for (const applicationBranch of CDPipelineData?.spec.inputDockerStreams) {
        const branchObject = availableBranches.find(
          (el) => el.metadataBranchName === applicationBranch
        );

        if (
          !branchObject ||
          !availableBranches.find((el) => el.metadataBranchName === applicationBranch)
        ) {
          continue;
        }

        newBranchFieldValue = branchObject.metadataBranchName;
      }
    } else {
      newBranchFieldValue = availableBranches?.[0].metadataBranchName;
    }

    // @ts-ignore
    setValue(rowAppBranchField, newBranchFieldValue);

    setValue(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, [
      ...getValues(CDPIPELINE_FORM_NAMES.inputDockerStreams.name).filter(
        (el: string) => el !== newBranchFieldValue
      ),
      newBranchFieldValue,
    ]);
  }, [
    CDPipelineData?.spec.applications,
    CDPipelineData?.spec.inputDockerStreams,
    appName,
    applicationBranchesList,
    applicationBranchesListIsLoading,
    getValues,
    rowAppBranchField,
    setValue,
  ]);

  React.useEffect(() => {
    setDefaultValues();
  }, [setDefaultValues]);

  // @ts-ignore
  const rowAppBranchFieldValue: string = watch(rowAppBranchField);

  const appBranchError = (
    errors?.[CDPIPELINE_FORM_NAMES.applicationsFieldArray.name as ValueOf<typeof NAMES>] as Record<
      number,
      any
    >
  )?.[index]?.appBranch;

  return (
    <Grid item xs={12} className={classes.application}>
      <LoadingWrapper isLoading={applicationBranchesListIsLoading}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <FormTextField
              {...register(
                // @ts-ignore
                rowAppNameField
              )}
              label="Application"
              disabled
              defaultValue={appName}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={6}>
            <FormAutocompleteSingle
              placeholder={'Select branch'}
              {...register(
                // @ts-ignore
                rowAppBranchField,
                {
                  required: 'Select branch',
                  onChange: ({ target: { value } }: FieldEvent) => {
                    const currentInputDockerStreamsValue = getValues(
                      CDPIPELINE_FORM_NAMES.inputDockerStreams.name
                    );

                    const newInputDockerStreamsValue = [
                      ...currentInputDockerStreamsValue.filter(
                        (el: string) => el !== rowAppBranchFieldValue
                      ),
                      value,
                    ];
                    setValue(
                      CDPIPELINE_FORM_NAMES.inputDockerStreams.name,
                      newInputDockerStreamsValue
                    );
                  },
                }
              )}
              label="Branch"
              control={control}
              errors={{
                [appBranchError?.ref?.name]: appBranchError,
              }}
              defaultValue={{
                label: '',
                value: '',
              }}
              options={
                applicationBranchesList
                  ? applicationBranchesList.map((el) => ({
                      label: el.spec.branchName,
                      value: el.metadata.name,
                    }))
                  : []
              }
            />
          </Grid>
          <Grid item xs={1} sx={{ mt: theme.typography.pxToRem(FORM_CONTROL_LABEL_HEIGHT) }}>
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
      </LoadingWrapper>
    </Grid>
  );
};
