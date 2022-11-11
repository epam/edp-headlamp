import { useFormContext } from 'react-hook-form';
import { MuiCore, MuiLab, React } from '../../../../plugin.globals';
import { FormSelect } from '../../../FormComponents';
import { Render } from '../../../Render';
import { ApplicationRow } from './components/ApplicationRow';
import { useUpdatedApplications } from './hooks/useUpdatedApplications';
import { Application, ApplicationsProps } from './types';

const { Grid, Button, Typography } = MuiCore;
const { Alert } = MuiLab;

const getUsedApplications = (applications: Application[]) => {
    return applications.filter(el => el.isUsed);
};

const getUnusedApplications = (applications: Application[]) => {
    return applications.filter(el => !el.isUsed);
};

export const Applications = ({ names, handleFormFieldChange }: ApplicationsProps) => {
    const {
        register,
        formState: { errors },
        control,
        watch,
        resetField,
        setValue,
        trigger,
    } = useFormContext();

    register(names.applications.name, {
        required: 'Choose applications',
    });

    register(names.applicationsToPromote.name);

    register(names.inputDockerStreams.name);

    const namespaceFieldValue = watch(names.namespace.name);
    const applicationsToAddChooserFieldValue = watch(names.applicationsToAddChooser.name);
    const applicationsFieldValue = watch(names.applications.name);
    const applicationsToPromoteValue = watch(names.applicationsToPromote.name);
    const applicationsBranchesFieldValue = watch(names.inputDockerStreams.name);

    const { applications, setApplications } = useUpdatedApplications({
        values: {
            namespaceFieldValue,
            applicationsFieldValue,
            applicationsToPromoteValue,
            applicationsBranchesFieldValue,
        },
        setValue,
    });

    const handleAddApplicationRow = React.useCallback(async () => {
        setApplications(prev => {
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

            handleFormFieldChange({
                name: names.applications.name,
                value: pipelineApplications,
            });

            setValue(names.applications.name, pipelineApplications, {
                shouldDirty: true,
            });

            trigger(names.applications.name);

            return newApplications;
        });
        resetField(names.applicationsToAddChooser.name);
    }, [
        applicationsToAddChooserFieldValue,
        handleFormFieldChange,
        names,
        resetField,
        setApplications,
        setValue,
        trigger,
    ]);

    const usedApplications = React.useMemo(() => {
        return getUsedApplications(applications);
    }, [applications]);

    const unusedApplications = React.useMemo(() => {
        return getUnusedApplications(applications);
    }, [applications]);

    const applicationsOptionsListIsDisabled = React.useMemo(() => {
        return !namespaceFieldValue || usedApplications.length === applications.length;
    }, [applications.length, namespaceFieldValue, usedApplications.length]);

    const applicationsAddingButtonIsDisabled = React.useMemo(() => {
        return (
            !namespaceFieldValue ||
            !applicationsToAddChooserFieldValue ||
            usedApplications.length === applications.length
        );
    }, [
        applications.length,
        applicationsToAddChooserFieldValue,
        namespaceFieldValue,
        usedApplications.length,
    ]);

    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <FormSelect
                            {...register(names.applicationsToAddChooser.name)}
                            label={'Applications'}
                            placeholder={'Choose applications'}
                            title={'Choose applications'}
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
                <Grid container spacing={2}>
                    <Render condition={!!applications.length}>
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

                            {usedApplications.map((application, idx) => {
                                const key = `${application.value}::${idx}`;

                                return (
                                    <ApplicationRow
                                        key={key}
                                        names={names}
                                        application={application}
                                        setApplications={setApplications}
                                        handleFormFieldChange={handleFormFieldChange}
                                    />
                                );
                            })}
                        </>
                    </Render>
                </Grid>
            </Grid>
            <Render condition={!applicationsFieldValue || !applicationsFieldValue.length}>
                <Grid item xs={12}>
                    <Alert severity="info" elevation={2} variant="filled">
                        Please, add at least one application
                    </Alert>
                </Grid>
            </Render>
        </>
    );
};
