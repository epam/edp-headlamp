import { Icon } from '@iconify/react';
import { Grid, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { FormAutocomplete } from '../../../../../../providers/Form/components/FormAutocomplete';
import { FieldEvent } from '../../../../../../types/forms';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { ApplicationRow } from './components/ApplicationRow';

export const Applications = () => {
  const {
    extra: { applications },
  } = useCurrentDialog();

  const {
    register,
    formState: { errors },
    control,
    watch,
    getValues,
    setValue,
  } = useTypedFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: CDPIPELINE_FORM_NAMES.applicationsFieldArray.name,
  });

  const applicationsOptions = React.useMemo(
    () =>
      applications.map((app) => ({
        label: app.metadata.name,
        value: app.metadata.name,
      })),
    [applications]
  );

  const currentAppFieldArrayValue = watch(CDPIPELINE_FORM_NAMES.applicationsFieldArray.name) as {
    appName: string;
    appBranch: string;
    appToPromote: string;
  }[];

  const handleApplicationChanges = (newApplications: string[]) => {
    const prevAppNames = currentAppFieldArrayValue?.map((app) => app.appName);
    const addedApplications = newApplications.filter((app) => !prevAppNames.includes(app));

    addedApplications.forEach((app) => {
      append({ appName: app, appBranch: '', appToPromote: false });
    });

    const removedApplications = currentAppFieldArrayValue
      .map((app, index) => ({ ...app, index }))
      .filter((app) => !newApplications.includes(app.appName));

    const removedApplicationsBranchesNames = removedApplications.map((app) => app.appBranch);

    const newInputDockerStreamsValue = getValues(
      CDPIPELINE_FORM_NAMES.inputDockerStreams.name
    ).filter((stream) => !removedApplicationsBranchesNames.includes(stream));

    setValue(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, newInputDockerStreamsValue);

    const removedApplicationIndices = removedApplications.map((app) => app.index);

    setValue(CDPIPELINE_FORM_NAMES.applications.name, newApplications, { shouldDirty: false });

    const newApplicationsToPromoteValue = newApplications.reduce((acc, appName) => {
      const appToPromote = currentAppFieldArrayValue.find(
        (app) => app.appName === appName
      )?.appToPromote;

      if (appToPromote) {
        acc.push(appName);
      }

      return acc;
    }, []);

    setValue(CDPIPELINE_FORM_NAMES.applicationsToPromote.name, newApplicationsToPromoteValue, {
      shouldDirty: false,
    });

    removedApplicationIndices.reverse().forEach((index) => {
      remove(index);
    });
  };

  return (
    <Stack spacing={3}>
      <FormAutocomplete
        {...register(CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name, {
          onChange: ({ target: { value } }: FieldEvent) => handleApplicationChanges(value),
        })}
        options={applicationsOptions}
        control={control}
        errors={errors}
        label="Applications"
        placeholder={'Select applications'}
        title={'Select the applications linked to this Deployment Flow.'}
      />
      <div>
        <Grid container spacing={2}>
          {!!fields && !!fields.length ? (
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
          {fields.map((field, index) => {
            return (
              <ApplicationRow
                //@ts-ignore
                application={applications.find((el) => el.metadata.name === field.appName)}
                removeRow={() => remove(index)}
                index={index}
                key={field.id}
              />
            );
          })}
        </Grid>
      </div>
    </Stack>
  );
};
