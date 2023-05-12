import { useFormContext } from 'react-hook-form';
import { MuiCore, MuiLab, React } from '../../../../plugin.globals';
import { getNamespace } from '../../../../utils/getNamespace';
import { FormSelect } from '../../../FormComponents';
import { Render } from '../../../Render';
import { ApplicationRow } from './components/ApplicationRow';
import { useUpdatedApplications } from './hooks/useUpdatedApplications';
import { Application, ApplicationsProps } from './types';

const { Grid, Button, Typography, CircularProgress } = MuiCore;
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
        required: 'Select applications',
    });

    register(names.applicationsToPromote.name);

    register(names.inputDockerStreams.name, {
        required: 'Select branch',
    });

    const namespace = getNamespace();
    const applicationsToAddChooserFieldValue = watch(names.applicationsToAddChooser.name);
    const applicationsFieldValue = watch(names.applications.name);
    const applicationsToPromoteValue = watch(names.applicationsToPromote.name);
    const applicationsBranchesFieldValue = watch(names.inputDockerStreams.name);

    const [appsWithBranches, setAppsWithBranches] = React.useState<Application[]>([]);

    const { isLoading, error } = useUpdatedApplications({
        values: {
            namespace,
            applicationsFieldValue,
            applicationsToPromoteValue,
            applicationsBranchesFieldValue,
        },
        setValue,
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
        setAppsWithBranches,
        setValue,
        trigger,
    ]);

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
        <>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <FormSelect
                            {...register(names.applicationsToAddChooser.name)}
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
                <Grid container spacing={2}>
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
                                <CircularProgress />
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
                                                names={names}
                                                application={application}
                                                setAppsWithBranches={setAppsWithBranches}
                                                handleFormFieldChange={handleFormFieldChange}
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
                    <Alert severity="info" elevation={2} variant="filled">
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
                    <Alert severity="info" elevation={2} variant="filled">
                        Select the application branch
                    </Alert>
                </Grid>
            </Render>
        </>
    );
};
