import { Icon } from '@iconify/react';
import { Alert, CircularProgress, Grid, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { CODEBASE_TYPES } from '../../../../../../constants/codebaseTypes';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useCodebasesByTypeLabelQuery } from '../../../../../../k8s/groups/EDP/Codebase/hooks/useCodebasesByTypeLabelQuery';
import { CodebaseKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codebase/types';
import { FormAutocomplete } from '../../../../../../providers/Form/components/FormAutocomplete';
import { FieldEvent } from '../../../../../../types/forms';
import { KubeObjectListInterface } from '../../../../../../types/k8s';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { ApplicationRow } from './components/ApplicationRow';

const getUsedApps = (
  applicationList: KubeObjectListInterface<CodebaseKubeObjectInterface>,
  applicationsFieldValue: string[]
) => {
  return applicationList
    ? applicationList.items.filter((app) => applicationsFieldValue.includes(app.metadata.name))
    : [];
};

const getUnusedApps = (
  applicationList: KubeObjectListInterface<CodebaseKubeObjectInterface>,
  applicationsFieldValue: string[]
) => {
  return applicationList
    ? applicationList.items.filter((app) => !applicationsFieldValue.includes(app.metadata.name))
    : [];
};

export const Applications = () => {
  const {
    props: { CDPipelineData },
  } = useCurrentDialog();

  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
    trigger,
  } = useTypedFormContext();

  register(CDPIPELINE_FORM_NAMES.applications.name, {
    required: 'Select applications',
  });

  register(CDPIPELINE_FORM_NAMES.applicationsToPromote.name);

  register(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, {
    required: 'Select branch',
  });

  const applicationsBranchesFieldValue = watch(CDPIPELINE_FORM_NAMES.inputDockerStreams.name);
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

  const handleApplicationsListChange = React.useCallback(
    async (newApps: string[]) => {
      setValue(CDPIPELINE_FORM_NAMES.applications.name, newApps);
      await trigger(CDPIPELINE_FORM_NAMES.applications.name);
    },
    [setValue, trigger]
  );

  const usedApplications = React.useMemo(
    () => getUsedApps(applicationList, applicationsFieldValue),
    [applicationsFieldValue, applicationList]
  );

  const unusedApplications = React.useMemo(
    () => getUnusedApps(applicationList, applicationsFieldValue),
    [applicationsFieldValue, applicationList]
  );

  return (
    <Stack spacing={3}>
      <FormAutocomplete
        {...register(CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name, {
          onChange: ({ target: { value } }: FieldEvent) => handleApplicationsListChange(value),
        })}
        options={unusedApplications ? unusedApplications.map((el) => el.metadata.name) : []}
        control={control}
        errors={errors}
        label="Applications"
        placeholder={'Select applications'}
        title={'Select the applications linked to this Deployment Flow.'}
      />
      <div>
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
                          title={'Specify the branch of the selected applications for deployment.'}
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
                              'Enables the promotion of applications to the higher environment upon the successful pass through all quality gates.'
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
      </div>
      {(!applicationsFieldValue || !applicationsFieldValue.length) && (
        <Alert severity="info" variant="outlined">
          Add at least one application
        </Alert>
      )}
      {(!applicationsBranchesFieldValue || !applicationsBranchesFieldValue.length) &&
      applicationsFieldValue &&
      applicationsFieldValue.length ? (
        <Alert severity="info" variant="outlined">
          Select the application branch
        </Alert>
      ) : null}
    </Stack>
  );
};
