import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Render } from '../../../../../components/Render';
import { FormSelect } from '../../../../../providers/Form/components/FormSelect';
import { getDefaultNamespace } from '../../../../../utils/getDefaultNamespace';
import { CDPIPELINE_FORM_NAMES } from '../../../names';
import { CreateEditCDPipelineFormValues } from '../../../types';
import { ApplicationRow } from './components/ApplicationRow';
import { useUpdatedApplications } from './hooks/useUpdatedApplications';
import { Application } from './types';

const getUsedApplications = (applications: Application[]) => {
    return applications.filter(el => el.isUsed);
};

const getUnusedApplications = (applications: Application[]) => {
    return applications.filter(el => !el.isUsed);
};

export const Applications = () => {
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

    const applicationsFieldValue = watch(CDPIPELINE_FORM_NAMES.applications.name);
    const applicationsBranchesFieldValue = watch(CDPIPELINE_FORM_NAMES.inputDockerStreams.name);
    const applicationsToAddChooserFieldValue = watch(
        CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name
    );
    const [appsWithBranches, setAppsWithBranches] = React.useState<Application[]>([]);

    const { isLoading, error } = useUpdatedApplications({
        appsWithBranches,
        setAppsWithBranches,
    });

    const handleAddApplicationRow = React.useCallback(async () => {
        setAppsWithBranches(prev => {
            const newApplications = prev.map(application => {
                if (application.value === applicationsToAddChooserFieldValue) {
                    return {
                        label: application.label,
                        value: application.value,
                        availableBranches: application.availableBranches,
                        isUsed: true,
                        chosenBranch: null,
                        toPromote: false,
                    };
                }
                return application;
            });

            const pipelineApplications = getUsedApplications(newApplications).map(el => el.value);

            setValue(CDPIPELINE_FORM_NAMES.applications.name, pipelineApplications);
            trigger(CDPIPELINE_FORM_NAMES.applications.name);

            return newApplications;
        });
        resetField(CDPIPELINE_FORM_NAMES.applicationsToAddChooser.name);
    }, [applicationsToAddChooserFieldValue, resetField, setAppsWithBranches, setValue, trigger]);

    const usedApplications = React.useMemo(() => {
        return getUsedApplications(appsWithBranches);
    }, [appsWithBranches]);

    const unusedApplications = React.useMemo(() => {
        return getUnusedApplications(appsWithBranches);
    }, [appsWithBranches]);

    const applicationsOptionsListIsDisabled = React.useMemo(() => {
        return !namespace || usedApplications.length === appsWithBranches.length;
    }, [appsWithBranches.length, namespace, usedApplications.length]);

    const applicationsAddingButtonIsDisabled = React.useMemo(() => {
        return (
            !namespace ||
            !applicationsToAddChooserFieldValue ||
            usedApplications.length === appsWithBranches.length
        );
    }, [
        appsWithBranches.length,
        applicationsToAddChooserFieldValue,
        namespace,
        usedApplications.length,
    ]);

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
                            options={unusedApplications}
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
                <Grid container>
                    <Render condition={!!appsWithBranches.length}>
                        <>
                            <Render condition={!!usedApplications.length}>
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
                            </Render>
                            <Render condition={isLoading}>
                                <Grid
                                    item
                                    xs={12}
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <CircularProgress />
                                </Grid>
                            </Render>
                            <Render condition={!!error}>
                                <Typography color={'error'}>{error}</Typography>
                            </Render>
                            <Render condition={!isLoading && !error}>
                                <>
                                    {usedApplications.map((application, idx) => {
                                        const key = `${application.value}::${idx}`;

                                        return (
                                            <ApplicationRow
                                                key={key}
                                                application={application}
                                                setAppsWithBranches={setAppsWithBranches}
                                            />
                                        );
                                    })}
                                </>
                            </Render>
                        </>
                    </Render>
                </Grid>
            </Grid>
            <Render condition={!applicationsFieldValue || !applicationsFieldValue.length}>
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Add at least one application
                    </Alert>
                </Grid>
            </Render>
            <Render
                condition={
                    (!applicationsBranchesFieldValue || !applicationsBranchesFieldValue.length) &&
                    applicationsFieldValue &&
                    applicationsFieldValue.length
                }
            >
                <Grid item xs={12}>
                    <Alert severity="info" variant="outlined">
                        Select the application branch
                    </Alert>
                </Grid>
            </Render>
        </Grid>
    );
};
