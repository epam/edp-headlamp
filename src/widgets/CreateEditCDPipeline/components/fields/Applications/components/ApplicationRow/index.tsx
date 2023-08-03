import { Icon } from '@iconify/react';
import { Button, Grid, useTheme } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ICONS } from '../../../../../../../icons/iconify-icons-mapping';
import { useCodebaseBranchesByCodebaseNameLabelQuery } from '../../../../../../../k8s/EDPCodebaseBranch/hooks/useCodebaseBranchesByCodebaseNameLabelQuery';
import { useSpecificDialogContext } from '../../../../../../../providers/Dialog/hooks';
import { FormCheckbox } from '../../../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FormSelect } from '../../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { FieldEvent, FieldEventTarget } from '../../../../../../../types/forms';
import { CREATE_EDIT_CD_PIPELINE_DIALOG_NAME } from '../../../../../constants';
import { CDPIPELINE_FORM_NAMES } from '../../../../../names';
import {
    CreateEditCDPipelineDialogForwardedProps,
    CreateEditCDPipelineFormValues,
} from '../../../../../types';
import { createApplicationRowName } from '../../constants';
import { Application } from '../../types';
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
        watch,
    } = useFormContext<CreateEditCDPipelineFormValues>();

    const {
        forwardedProps: { CDPipelineData },
    } = useSpecificDialogContext<CreateEditCDPipelineDialogForwardedProps>(
        CREATE_EDIT_CD_PIPELINE_DIALOG_NAME
    );

    const [availableBranches, setAvailableBranches] = React.useState<
        Application['availableBranches']
    >([]);

    const { data } = useCodebaseBranchesByCodebaseNameLabelQuery({
        props: {
            codebaseName: application.value,
            namespace: CDPipelineData?.metadata.namespace,
        },
        options: {
            enabled: !!application.value,
        },
    });

    const applicationsBranchesFieldValue = watch(CDPIPELINE_FORM_NAMES.inputDockerStreams.name);

    const updateAppChosenBranch = React.useCallback(
        (availableBranches: Application['availableBranches']) => {
            if (!applicationsBranchesFieldValue || !applicationsBranchesFieldValue.length) {
                return;
            }

            const applicationAvailableBranchesSet = new Set(
                availableBranches.map(({ metadataBranchName }) => metadataBranchName)
            );

            for (const applicationBranch of applicationsBranchesFieldValue) {
                if (!applicationAvailableBranchesSet.has(applicationBranch)) {
                    continue;
                }

                const appBranchRowName = `${createApplicationRowName(
                    application.value
                )}-application-branch`;
                // @ts-ignore
                setValue(appBranchRowName, applicationBranch);
                application.chosenBranch = applicationBranch;
            }
        },
        [application, applicationsBranchesFieldValue, setValue]
    );

    React.useEffect(() => {
        if (!data) {
            return;
        }

        const branchesNames = data.items.map(el => ({
            specBranchName: el.spec.branchName,
            metadataBranchName: el.metadata.name,
        }));
        setAvailableBranches(branchesNames);
        updateAppChosenBranch(branchesNames);
    }, [data, updateAppChosenBranch]);

    const theme = useTheme();

    const handleChangeApplicationBranch = React.useCallback(
        ({ value: targetValue }: FieldEventTarget) => {
            setAppsWithBranches(prev => {
                const newApplications = prev.map(app => {
                    if (app.value === application.value) {
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
        [application.value, setAppsWithBranches, setValue]
    );

    const handleChangeApplicationToPromote = React.useCallback(
        ({ value: targetValue }: FieldEventTarget) => {
            setAppsWithBranches(prev => {
                const newApplications = prev.map(app => {
                    if (app.value === application.value) {
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
        [application.value, setAppsWithBranches, setValue]
    );

    const handleDeleteApplicationRow = React.useCallback(() => {
        setAppsWithBranches(prev => {
            const newApplications = prev.map(app => {
                if (app.value === application.value) {
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
    }, [resetField, setAppsWithBranches, setValue, application]);

    return (
        <Grid item xs={12} className={classes.application}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <FormTextField
                        {...register(
                            // @ts-ignore
                            `${createApplicationRowName(application.value)}-application-name`,
                            {}
                        )}
                        disabled
                        defaultValue={application.value}
                        control={control}
                        errors={errors}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormSelect
                        {...register(
                            // @ts-ignore
                            `${createApplicationRowName(application.value)}-application-branch`,
                            {
                                required: 'Select branch',
                                onChange: ({ target: { name, value } }: FieldEvent) =>
                                    handleChangeApplicationBranch({ name, value }),
                            }
                        )}
                        placeholder={'Select application branch'}
                        control={control}
                        errors={errors}
                        options={availableBranches.map(el => ({
                            label: el.specBranchName,
                            value: el.metadataBranchName,
                        }))}
                    />
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <FormCheckbox
                        {...register(
                            // @ts-ignore
                            `${createApplicationRowName(application.value)}-application-promote`,
                            {
                                onChange: ({ target: { name, value } }: FieldEvent) =>
                                    handleChangeApplicationToPromote({ name, value }),
                            }
                        )}
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
