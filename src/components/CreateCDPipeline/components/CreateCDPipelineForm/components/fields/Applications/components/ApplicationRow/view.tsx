import { useFormContext } from 'react-hook-form';
import { ICON_BUCKET } from '../../../../../../../../../constants/icons';
import { Iconify, MuiCore, MuiStyles, React } from '../../../../../../../../../plugin.globals';
import { FieldEvent } from '../../../../../../../../../types/forms';
import { FormSelect } from '../../../../../../../../FormComponents';
import { FormCheckbox } from '../../../../../../../../FormComponents/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../../../FormComponents/FormControlLabelWithTooltip';
import { FormTextField } from '../../../../../../../../FormComponents/FormTextField';
import { createApplicationRowName } from '../../constants';
import { useStyles } from './styles';
import { ApplicationRowProps } from './types';

const { Grid, Button } = MuiCore;
const { Icon } = Iconify;
const { useTheme } = MuiStyles;

export const ApplicationRow = ({
    names,
    application,
    setApplications,
    handleFormFieldChange,
}: ApplicationRowProps) => {
    const classes = useStyles();

    const {
        register,
        control,
        formState: { errors },
        resetField,
    } = useFormContext();

    const { value, availableBranches } = application;

    const theme: DefaultTheme = useTheme();

    const handleChangeApplicationBranch = React.useCallback(
        ({ target: { value: targetValue } }: FieldEvent) => {
            setApplications(prev => {
                const newApplications = prev.map(application => {
                    if (application.value === value) {
                        return {
                            ...application,
                            chosenBranch: targetValue,
                        };
                    }
                    return application;
                });

                const pipelineApplicationBranches = newApplications
                    .filter(el => el.isUsed)
                    .map(el => el.chosenBranch);

                handleFormFieldChange({
                    name: names.inputDockerStreams.name,
                    value: pipelineApplicationBranches,
                });

                return newApplications;
            });
        },
        [handleFormFieldChange, names.inputDockerStreams.name, setApplications, value]
    );

    const handleChangeApplicationToPromote = React.useCallback(
        ({ target: { value: targetValue } }: FieldEvent) => {
            setApplications(prev => {
                const newApplications = prev.map(application => {
                    if (application.value === value) {
                        return {
                            ...application,
                            toPromote: targetValue,
                        };
                    }
                    return application;
                });

                const pipelineApplicationsToPromote = newApplications
                    .filter(el => el.isUsed && el.toPromote)
                    .map(el => el.value);

                handleFormFieldChange({
                    name: names.applicationsToPromote.name,
                    value: pipelineApplicationsToPromote,
                });

                return newApplications;
            });
        },
        [handleFormFieldChange, names.applicationsToPromote.name, setApplications, value]
    );

    const handleDeleteApplicationRow = React.useCallback(() => {
        setApplications(prev => {
            const newApplications = prev.map(application => {
                if (application.value === value) {
                    return {
                        label: application.label,
                        value: application.value,
                        availableBranches: application.availableBranches,
                        isUsed: false,
                        chosenBranch: null,
                        toPromote: false,
                    };
                }
                return application;
            });

            const pipelineApplications = newApplications
                .filter(el => el.isUsed)
                .map(el => el.value);

            handleFormFieldChange({
                name: names.applications.name,
                value: pipelineApplications,
            });

            const pipelineApplicationBranches = newApplications
                .filter(el => el.isUsed)
                .map(el => el.chosenBranch);

            handleFormFieldChange({
                name: names.inputDockerStreams.name,
                value: pipelineApplicationBranches,
            });

            const pipelineApplicationsToPromote = newApplications
                .filter(el => el.isUsed && el.toPromote)
                .map(el => el.value);

            handleFormFieldChange({
                name: names.applicationsToPromote.name,
                value: pipelineApplicationsToPromote,
            });

            return newApplications;
        });

        resetField(`${createApplicationRowName(value)}-application-name`);
        resetField(`${createApplicationRowName(value)}-application-branch`);
        resetField(`${createApplicationRowName(value)}-application-promote`);
    }, [
        handleFormFieldChange,
        names.applications.name,
        names.applicationsToPromote.name,
        names.inputDockerStreams.name,
        resetField,
        setApplications,
        value,
    ]);

    return (
        <Grid item xs={12} className={classes.application}>
            <Grid container spacing={1} alignItems={'flex-end'}>
                <Grid item xs={4}>
                    <FormTextField
                        {...register(`${createApplicationRowName(value)}-application-name`, {})}
                        disabled
                        defaultValue={value}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormSelect
                        {...register(`${createApplicationRowName(value)}-application-branch`, {
                            onChange: handleChangeApplicationBranch,
                        })}
                        placeholder={'Choose application branch'}
                        control={control}
                        errors={errors}
                        options={availableBranches.map(el => ({ label: el, value: el }))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormCheckbox
                        {...register(`${createApplicationRowName(value)}-application-promote`, {
                            onChange: handleChangeApplicationToPromote,
                        })}
                        label={<FormControlLabelWithTooltip label={'Promote in pipeline'} />}
                        control={control}
                        errors={errors}
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
                        onClick={handleDeleteApplicationRow}
                    >
                        <Icon icon={ICON_BUCKET} width={20} color={theme.palette.grey['500']} />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
