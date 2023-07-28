import { Icon } from '@iconify/react';
import { Button, Grid, useTheme } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { FormCheckbox } from '../../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FormSelect } from '../../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { FieldEvent, FieldEventTarget } from '../../../../../../../types/forms';
import { CDPIPELINE_FORM_NAMES } from '../../../../../names';
import { CreateEditCDPipelineFormValues } from '../../../../../types';
import { createApplicationRowName } from '../../constants';
import { useStyles } from './styles';
import { ApplicationRowProps } from './types';

export const ApplicationRow = ({ application, setAppsWithBranches }: ApplicationRowProps) => {
    const classes = useStyles();

    const {
        register,
        control,
        formState: { errors },
        resetField,
        setValue,
    } = useFormContext<CreateEditCDPipelineFormValues>();

    const { value, availableBranches } = application;

    const theme: DefaultTheme = useTheme();

    const handleChangeApplicationBranch = React.useCallback(
        ({ value: targetValue }: FieldEventTarget) => {
            setAppsWithBranches(prev => {
                const newApplications = prev.map(app => {
                    if (app.value === value) {
                        return {
                            ...app,
                            chosenBranch: targetValue,
                        };
                    }
                    return app;
                });

                const pipelineApplicationBranches = newApplications
                    .filter(el => el.isUsed)
                    .map(el => el.chosenBranch);

                setValue(
                    CDPIPELINE_FORM_NAMES.inputDockerStreams.name,
                    pipelineApplicationBranches
                );

                return newApplications;
            });
        },
        [setAppsWithBranches, setValue, value]
    );

    const handleChangeApplicationToPromote = React.useCallback(
        ({ value: targetValue }: FieldEventTarget) => {
            setAppsWithBranches(prev => {
                const newApplications = prev.map(app => {
                    if (app.value === value) {
                        return {
                            ...app,
                            toPromote: targetValue,
                        };
                    }
                    return app;
                });

                const pipelineApplicationsToPromote = newApplications
                    .filter(el => el.isUsed && el.toPromote)
                    .map(el => el.value);

                setValue(
                    CDPIPELINE_FORM_NAMES.applicationsToPromote.name,
                    pipelineApplicationsToPromote
                );

                return newApplications;
            });
        },
        [setAppsWithBranches, setValue, value]
    );

    const handleDeleteApplicationRow = React.useCallback(() => {
        setAppsWithBranches(prev => {
            const newApplications = prev.map(app => {
                if (app.value === value) {
                    return {
                        label: app.label,
                        value: app.value,
                        availableBranches: app.availableBranches,
                        isUsed: false,
                        chosenBranch: null,
                        toPromote: false,
                    };
                }
                return app;
            });

            const pipelineApplications = newApplications
                .filter(el => el.isUsed)
                .map(el => el.value);

            setValue(CDPIPELINE_FORM_NAMES.applications.name, pipelineApplications);

            const pipelineApplicationBranches = newApplications
                .filter(el => el.isUsed)
                .map(el => el.chosenBranch);

            setValue(CDPIPELINE_FORM_NAMES.inputDockerStreams.name, pipelineApplicationBranches);

            const pipelineApplicationsToPromote = newApplications
                .filter(el => el.isUsed && el.toPromote)
                .map(el => el.value);

            setValue(
                CDPIPELINE_FORM_NAMES.applicationsToPromote.name,
                pipelineApplicationsToPromote
            );

            return newApplications;
        });
        // @ts-ignore
        resetField(`${createApplicationRowName(value)}-application-name`);
        // @ts-ignore
        resetField(`${createApplicationRowName(value)}-application-branch`);
        // @ts-ignore
        resetField(`${createApplicationRowName(value)}-application-promote`);
    }, [resetField, setAppsWithBranches, setValue, value]);

    return (
        <Grid item xs={12} className={classes.application}>
            <Grid container spacing={1} alignItems={'flex-end'}>
                <Grid item xs={4}>
                    <FormTextField
                        // @ts-ignore
                        {...register(`${createApplicationRowName(value)}-application-name`, {})}
                        disabled
                        defaultValue={value}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormSelect
                        // @ts-ignore
                        {...register(`${createApplicationRowName(value)}-application-branch`, {
                            required: 'Select branch',
                            onChange: ({ target: { name, value } }: FieldEvent) =>
                                handleChangeApplicationBranch({ name, value }),
                        })}
                        placeholder={'Select application branch'}
                        control={control}
                        errors={errors}
                        options={availableBranches.map(el => ({
                            label: el.specBranchName,
                            value: el.metadataBranchName,
                        }))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormCheckbox
                        // @ts-ignore
                        {...register(`${createApplicationRowName(value)}-application-promote`, {
                            onChange: ({ target: { name, value } }: FieldEvent) =>
                                handleChangeApplicationToPromote({ name, value }),
                        })}
                        label={<FormControlLabelWithTooltip label={'Promote in pipeline'} />}
                        control={control}
                        errors={errors}
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
                        onClick={handleDeleteApplicationRow}
                    >
                        <Icon icon={ICONS['BUCKET']} width={20} color={theme.palette.grey['500']} />
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};
