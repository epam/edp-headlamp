import { Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { qualityGateTypeSelectOptions } from '../../../../../../../configs/select-options/qualityGateTypes';
import { QUALITY_GATE_TYPES } from '../../../../../../../constants/qualityGateTypes';
import { FormSelect } from '../../../../../../../providers/Form/components/FormSelect';
import { FormTextField } from '../../../../../../../providers/Form/components/FormTextField';
import { STAGE_FORM_NAMES } from '../../../../../names';
import { CreateEditStageFormValues } from '../../../../../types';
import {
    createQualityGateAutotestFieldName,
    createQualityGateStepNameFieldName,
    createQualityGateTypeAutotestsBranchFieldName,
    createQualityGateTypeFieldName,
} from '../../utils';
import { QualityGateRowProps } from './types';

export const QualityGateRow = ({
    autotestsWithBranchesOptions,
    currentQualityGate,
}: QualityGateRowProps) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        resetField,
        setValue,
    } = useFormContext<CreateEditStageFormValues>();

    const qualityGatesFieldValue = watch(STAGE_FORM_NAMES.qualityGates.name);

    const currentQualityGateTypeFieldValue = watch(
        // @ts-ignore
        createQualityGateTypeFieldName(currentQualityGate.id)
    ) as unknown as string;
    const currentQualityGateAutotestFieldValue = watch(
        // @ts-ignore
        createQualityGateAutotestFieldName(currentQualityGate.id)
    ) as unknown as string;

    const availableQualityGateTypeSelectOptions = React.useMemo(() => {
        return qualityGateTypeSelectOptions.map(el => {
            if (el.value === QUALITY_GATE_TYPES.AUTOTESTS && !autotestsWithBranchesOptions.length) {
                return {
                    ...el,
                    disabled: true,
                };
            }

            return el;
        });
    }, [autotestsWithBranchesOptions]);

    const currentQualityGateBranchesOptions = React.useMemo(() => {
        return autotestsWithBranchesOptions.length && currentQualityGateAutotestFieldValue
            ? autotestsWithBranchesOptions
                  .filter(el => el.name === currentQualityGateAutotestFieldValue)[0]
                  .branches.map(el => ({
                      label: el,
                      value: el,
                  }))
            : [];
    }, [autotestsWithBranchesOptions, currentQualityGateAutotestFieldValue]);

    const handleChangeQualityGateType = React.useCallback(
        event => {
            const chosenQualityGateType = event.target.value;

            if (chosenQualityGateType === QUALITY_GATE_TYPES.MANUAL) {
                // @ts-ignore
                resetField(createQualityGateAutotestFieldName(currentQualityGate.id));
                resetField(
                    // @ts-ignore
                    createQualityGateTypeAutotestsBranchFieldName(currentQualityGate.id)
                );
            }

            const newQualityGates = qualityGatesFieldValue.map(qualityGate => {
                if (qualityGate.id !== currentQualityGate.id) {
                    return qualityGate;
                }

                if (chosenQualityGateType === QUALITY_GATE_TYPES.MANUAL) {
                    return {
                        ...qualityGate,
                        autotestName: null,
                        branchName: null,
                        qualityGateType: chosenQualityGateType,
                    };
                }

                return {
                    ...qualityGate,
                    qualityGateType: chosenQualityGateType,
                };
            });

            setValue(STAGE_FORM_NAMES.qualityGates.name, newQualityGates);
        },
        [currentQualityGate.id, qualityGatesFieldValue, resetField, setValue]
    );

    const handleChangeQualityGateStepName = React.useCallback(
        event => {
            const chosenQualityGateStepName = event.target.value;

            const newQualityGates = qualityGatesFieldValue.map(qualityGate => {
                if (qualityGate.id !== currentQualityGate.id) {
                    return qualityGate;
                }

                return {
                    ...qualityGate,
                    stepName: chosenQualityGateStepName,
                };
            });

            setValue(STAGE_FORM_NAMES.qualityGates.name, newQualityGates);
        },
        [currentQualityGate.id, qualityGatesFieldValue, setValue]
    );

    const handleChangeQualityGateAutotestName = React.useCallback(
        event => {
            const chosenQualityGateAutotest = event.target.value;
            // @ts-ignore
            resetField(createQualityGateTypeAutotestsBranchFieldName(currentQualityGate.id));

            const newQualityGates = qualityGatesFieldValue.map(qualityGate => {
                if (qualityGate.id !== currentQualityGate.id) {
                    return qualityGate;
                }

                return {
                    ...qualityGate,
                    autotestName: chosenQualityGateAutotest,
                };
            });

            setValue(STAGE_FORM_NAMES.qualityGates.name, newQualityGates);
        },
        [currentQualityGate.id, qualityGatesFieldValue, resetField, setValue]
    );

    const handleChangeQualityGateAutotestBranchName = React.useCallback(
        event => {
            const chosenQualityGateAutotestsBranch = event.target.value;

            const newQualityGates = qualityGatesFieldValue.map(qualityGate => {
                if (qualityGate.id !== currentQualityGate.id) {
                    return qualityGate;
                }

                return {
                    ...qualityGate,
                    branchName: chosenQualityGateAutotestsBranch,
                };
            });

            setValue(STAGE_FORM_NAMES.qualityGates.name, newQualityGates);
        },
        [currentQualityGate.id, qualityGatesFieldValue, setValue]
    );

    const availableAutotests = React.useMemo(
        () =>
            autotestsWithBranchesOptions.map(autotest => {
                const { name, branches } = autotest;
                const alreadyChosenAutotest = qualityGatesFieldValue.find(
                    ({ autotestName }) => autotestName === name
                );

                const qualityGatesByChosenAutotest = qualityGatesFieldValue.filter(
                    ({ autotestName }) => autotestName === name
                );

                const allBranchesAreChosen =
                    qualityGatesByChosenAutotest.length === branches.length &&
                    qualityGatesByChosenAutotest.every(qualityGate =>
                        branches.includes(qualityGate.branchName)
                    );

                if (alreadyChosenAutotest && branches.length <= 1) {
                    return {
                        ...autotest,
                        disabled: true,
                    };
                }

                if (allBranchesAreChosen) {
                    return {
                        ...autotest,
                        disabled: true,
                    };
                }

                return autotest;
            }),
        [autotestsWithBranchesOptions, qualityGatesFieldValue]
    );

    const availableAutotestBranches = React.useMemo(
        () =>
            currentQualityGateBranchesOptions.map(branchOption => {
                const qualityGatesByChosenAutotest = qualityGatesFieldValue.filter(
                    ({ autotestName }) => autotestName === currentQualityGateAutotestFieldValue
                );

                const alreadyChosenAutotestBranch = qualityGatesByChosenAutotest.find(
                    qualityGate => qualityGate.branchName === branchOption.value
                );

                if (alreadyChosenAutotestBranch) {
                    return {
                        ...branchOption,
                        disabled: true,
                    };
                }

                return branchOption;
            }),
        [
            currentQualityGateAutotestFieldValue,
            currentQualityGateBranchesOptions,
            qualityGatesFieldValue,
        ]
    );

    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <FormSelect
                            {...register(
                                // @ts-ignore
                                createQualityGateTypeFieldName(currentQualityGate.id),
                                {
                                    onChange: handleChangeQualityGateType,
                                }
                            )}
                            label={'Quality gate type'}
                            placeholder={'Select quality gate type'}
                            control={control}
                            errors={errors}
                            defaultValue={currentQualityGate.qualityGateType}
                            options={availableQualityGateTypeSelectOptions}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormTextField
                            {...register(
                                // @ts-ignore
                                createQualityGateStepNameFieldName(currentQualityGate.id),
                                {
                                    required: 'Enter step name',
                                    onChange: handleChangeQualityGateStepName,
                                }
                            )}
                            label={'Step name'}
                            placeholder={'Enter step name'}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    {!!autotestsWithBranchesOptions.length &&
                    currentQualityGateTypeFieldValue === QUALITY_GATE_TYPES.AUTOTESTS ? (
                        <>
                            <Grid item xs={3}>
                                <FormSelect
                                    {...register(
                                        // @ts-ignore
                                        createQualityGateAutotestFieldName(currentQualityGate.id),
                                        {
                                            onChange: handleChangeQualityGateAutotestName,
                                        }
                                    )}
                                    label={'Autotest'}
                                    placeholder={'Select autotest'}
                                    control={control}
                                    errors={errors}
                                    options={availableAutotests.map(
                                        ({ name, disabled = false }) => ({
                                            label: name,
                                            value: name,
                                            disabled,
                                        })
                                    )}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormSelect
                                    {...register(
                                        // @ts-ignore
                                        createQualityGateTypeAutotestsBranchFieldName(
                                            currentQualityGate.id
                                        ),
                                        {
                                            onChange: handleChangeQualityGateAutotestBranchName,
                                        }
                                    )}
                                    label={'Autotest branch'}
                                    placeholder={'Select autotest branch'}
                                    control={control}
                                    errors={errors}
                                    disabled={!currentQualityGateBranchesOptions.length}
                                    options={availableAutotestBranches}
                                />
                            </Grid>
                        </>
                    ) : null}
                </Grid>
            </Grid>
        </>
    );
};
