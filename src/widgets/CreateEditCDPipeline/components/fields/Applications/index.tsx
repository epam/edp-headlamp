import { Icon } from '@iconify/react';
import { Button, CircularProgress, Grid, Tooltip, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { ICONS } from '../../../../../icons/iconify-icons-mapping';
import { useCodebasesByTypeLabelQuery } from '../../../../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { KubeObjectListInterface } from '../../../../../types/k8s';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import {
  CreateEditCDPipelineDialogForwardedProps,
  CreateEditCDPipelineFormValues,
} from '../../../types';
import { ApplicationRow } from './components/ApplicationRow';

const getUsedApps = (
  applicationList: KubeObjectListInterface<EDPCodebaseKubeObjectInterface>,
  applicationsFieldValue: string[]
) => {
  return applicationList
    ? applicationList.items.filter((app) => applicationsFieldValue.includes(app.metadata.name))
    : [];
};

const getUnusedApps = (
  applicationList: KubeObjectListInterface<EDPCodebaseKubeObjectInterface>,
  applicationsFieldValue: string[]
) => {
  return applicationList
    ? applicationList.items.filter((app) => !applicationsFieldValue.includes(app.metadata.name))
    : [];
};

export const Applications = () => {
  const {
    forwardedProps: { CDPipelineData },
  } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
    CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
  );

  const {
    register,
    formState: { errors },
    control,
    watch,
    resetField,
    setValue,
    trigger,
  } = useFormContext<CreateEditCDPipelineFormValues>();

  register(CDPIPELINE_FORM_NAMES.applications.name, {
    required: 'Select applications',
  });

  register(CDPIPELINE_FORM_NAMES.applicationsToPromote.name);

  register(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, {
    required: 'Select branch',
  });

  const namespace = getDefaultNamespace();

  const applicationsBranchesFieldValue = watch(CDPIPELINE_FORM_NAMES.inputDockerStreams.name);
  const applicationsToAddChooserFieldValue = watch(
    CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name
  );
  const applicationsFieldValue = watch(CDPIPELINE_FORM_NAMES.applications.name);

  const {
    data: applicationList,
    isLoading,
    error,
  } = useCodebasesByTypeLabelQuery({
    props: {
      namespace: CDPipelineData?.metadata.namespace,
      codebaseType: CODEBASE_TYPES.APPLICATION,
    },
  });

  const handleAddApplicationRow = React.useCallback(async () => {
    const newApplications = [...applicationsFieldValue, applicationsToAddChooserFieldValue];

    setValue(CDPIPELINE_FORM_NAMES.applications.name, newApplications);
    await trigger(CDPIPELINE_FORM_NAMES.applications.name);
    resetField(CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name);
  }, [applicationsFieldValue, applicationsToAddChooserFieldValue, resetField, setValue, trigger]);

  const usedApplications = React.useMemo(
    () => getUsedApps(applicationList, applicationsFieldValue),
    [applicationsFieldValue, applicationList]
  );

  const unusedApplications = React.useMemo(
    () => getUnusedApps(applicationList, applicationsFieldValue),
    [applicationsFieldValue, applicationList]
  );

  const applicationsOptionsListIsDisabled = React.useMemo(
    () => !namespace || usedApplications.length === applicationList?.items.length,
    [applicationList, namespace, usedApplications.length]
  );

  const applicationsAddingButtonIsDisabled = React.useMemo(
    () =>
      !namespace ||
      !applicationsToAddChooserFieldValue ||
      usedApplications.length === applicationList?.items.length,
    [applicationList, applicationsToAddChooserFieldValue, namespace, usedApplications.length]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <FormSelect
              {...register(CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name)}
              label={'Applications'}
              title={'Select the applications linked to this environment.'}
              control={control}
              errors={errors}
              disabled={applicationsOptionsListIsDisabled}
              options={
                unusedApplications
                  ? unusedApplications.map((el) => {
                      return {
                        label: el.metadata.name,
                        value: el.metadata.name,
                      };
                    })
                  : []
              }
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
              variant={'contained'}
              disabled={applicationsAddingButtonIsDisabled}
              onClick={handleAddApplicationRow}
            >
              add
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {!!applicationList && !!applicationList.items.length ? (
            <>
              {!!usedApplications.length ? (
                <>
                  <Grid item xs={4}>
                    <Typography>Application</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                      <Grid item>Branch</Grid>
                      <Grid item>
                        <Tooltip
                          title={
                            'Specify the branch of the selected applications for deployment within this environment.'
                          }
                        >
                          <Icon icon={ICONS.INFO_CIRCLE} width={18} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      <Grid container spacing={1} alignItems={'center'} wrap={'nowrap'}>
                        <Grid item>To promote</Grid>
                        <Grid item>
                          <Tooltip
                            title={
                              'Enables the promotion of applications to the next pipeline stage upon the successful pass through all quality gates.'
                            }
                          >
                            <Icon icon={ICONS.INFO_CIRCLE} width={18} />
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>Delete</Typography>
                  </Grid>
                </>
              ) : null}
              {isLoading && (
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Grid>
              )}
              {!!error && <Typography color={'error'}>{error}</Typography>}
              {!isLoading && !error && (
                <>
                  {usedApplications.map((application, idx) => {
                    const key = `${application.metadata.name}::${idx}`;

                    return <ApplicationRow key={key} application={application} />;
                  })}
                </>
              )}
            </>
          ) : null}
        </Grid>
      </Grid>
      {(!applicationsFieldValue || !applicationsFieldValue.length) && (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            Add at least one application
          </Alert>
        </Grid>
      )}
      {(!applicationsBranchesFieldValue || !applicationsBranchesFieldValue.length) &&
      applicationsFieldValue &&
      applicationsFieldValue.length ? (
        <Grid item xs={12}>
          <Alert severity="info" variant="outlined">
            Select the application branch
          </Alert>
        </Grid>
      ) : null}
    </Grid>
  );
};
