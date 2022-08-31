import { useFormContext } from 'react-hook-form';
import { ICON_PLUS } from '../../../../../../../constants/icons';
import { Iconify, MuiCore, MuiStyles, React } from '../../../../../../../plugin.globals';
import { FormSelect } from '../../../../../../FormComponents';
import { Render } from '../../../../../../Render';
import { ApplicationRow } from './components/ApplicationRow';
import { useUpdatedApplications } from './hooks/useUpdatedApplications';
import { Application, ApplicationsProps } from './types';

const { Grid, Button } = MuiCore;
const { Icon } = Iconify;
const { useTheme } = MuiStyles;

const getUsedApplications = (applications: Application[]) => {
    return applications.filter(el => el.isUsed);
};

const getUnusedApplications = (applications: Application[]) => {
    return applications.filter(el => !el.isUsed);
};

export const Applications = ({ names, handleFormFieldChange }: ApplicationsProps) => {
    const theme = useTheme();

    const {
        register,
        formState: { errors },
        control,
        watch,
        resetField,
        setValue,
    } = useFormContext();

    const namespaceFieldValue = watch(names.namespace.name);
    const applicationsToAddChooserFieldValue = watch(names.applicationsToAddChooser.name);

    const [applications, setApplications] = useUpdatedApplications({ watch, names, setValue });

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
                target: {
                    name: names.applications.name,
                    value: pipelineApplications,
                },
            });

            return newApplications;
        });
        resetField(names.applicationsToAddChooser.name);
    }, [
        applicationsToAddChooserFieldValue,
        handleFormFieldChange,
        names.applications.name,
        names.applicationsToAddChooser.name,
        resetField,
        setApplications,
    ]);

    const usedApplications = React.useMemo(() => {
        return getUsedApplications(applications);
    }, [applications]);

    const unusedApplications = React.useMemo(() => {
        return getUnusedApplications(applications);
    }, [applications]);

    const applicationsOptionsListIsDisabled = React.useMemo(() => {
        return !namespaceFieldValue || usedApplications.length;
    }, [namespaceFieldValue, usedApplications.length]);

    const applicationsAddingButtonIsDisabled = React.useMemo(() => {
        return (
            !namespaceFieldValue || !applicationsToAddChooserFieldValue || usedApplications.length
        );
    }, [applicationsToAddChooserFieldValue, namespaceFieldValue, usedApplications.length]);

    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <FormSelect
                            {...register(names.applicationsToAddChooser.name)}
                            label={'Mapping field name'}
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
                        direction={'column'}
                        justifyContent={'flex-end'}
                        alignItems={'center'}
                        style={{ display: 'flex' }}
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
                            <Icon
                                icon={ICON_PLUS}
                                width={20}
                                color={
                                    applicationsAddingButtonIsDisabled
                                        ? 'white'
                                        : theme.palette.primary.main
                                }
                            />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Render condition={!!applications.length}>
                        <>
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
        </>
    );
};
