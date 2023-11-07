import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { useCodebasesByTypeLabelQuery } from '../../../../../k8s/EDPCodebase/hooks/useCodebasesByTypeLabelQuery';
import { useSpecificDialogContext } from '../../../../../providers/Dialog/hooks';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import {
    CreateEditCDPipelineDialogForwardedProps,
    CreateEditCDPipelineFormValues,
} from '../../../types';
import { ApplicationRow } from './components/ApplicationRow';

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
        () =>
            applicationList
                ? applicationList.items.filter(app =>
                      applicationsFieldValue.includes(app.metadata.name)
                  )
                : [],
        [applicationsFieldValue, applicationList]
    );

    const unusedApplications = React.useMemo(
        () =>
            applicationList
                ? applicationList.items.filter(
                      app => !applicationsFieldValue.includes(app.metadata.name)
                  )
                : [],
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
                            placeholder={'Select applications'}
                            control={control}
                            errors={errors}
                            disabled={applicationsOptionsListIsDisabled}
                            options={
                                unusedApplications
                                    ? unusedApplications.map(el => {
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
                            color={'default'}
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
                                        <Typography>Branch</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography>To promote</Typography>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Typography>Delete</Typography>
                                    </Grid>
                                </>
                            ) : null}
                            {isLoading && (
                                <Grid
                                    item
                                    xs={12}
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <CircularProgress />
                                </Grid>
                            )}
                            {!!error && <Typography color={'error'}>{error}</Typography>}
                            {!isLoading && !error && (
                                <>
                                    {usedApplications.map((application, idx) => {
                                        const key = `${application.metadata.name}::${idx}`;

                                        return (
                                            <ApplicationRow key={key} application={application} />
                                        );
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
