import { useFormContext } from 'react-hook-form';
import { qualityGateTypeSelectOptions } from '../../../../../../configs/select-options/qualityGateTypes';
import { QUALITY_GATE_TYPES } from '../../../../../../constants/qualityGateTypes';
import { MuiCore, React } from '../../../../../../plugin.globals';
import { FormSelect } from '../../../../../FormComponents';
import { FormTextField } from '../../../../../FormComponents';
import { Render } from '../../../../../Render';
import {
    createQualityGateAutotestFieldName,
    createQualityGateStepNameFieldName,
    createQualityGateTypeAutotestsBranchFieldName,
    createQualityGateTypeFieldName,
} from '../../utils';
import { QualityGateRowProps } from './types';

const { Grid } = MuiCore;

export const QualityGateRow = ({
    autotests,
    currentQualityGateData,
    setQualityGates,
    setNewQualityGates,
    qualityGates,
}: QualityGateRowProps): React.ReactElement => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        resetField,
    } = useFormContext();

    const currentQualityGateTypeFieldValue = watch(
        createQualityGateTypeFieldName(currentQualityGateData.id)
    );
    const currentQualityGateAutotestFieldValue = watch(
        createQualityGateAutotestFieldName(currentQualityGateData.id)
    );

    const availableQualityGateTypeSelectOptions = React.useMemo(() => {
        return qualityGateTypeSelectOptions.map(el => {
            if (el.value === QUALITY_GATE_TYPES.AUTOTESTS && !autotests.length) {
                return {
                    ...el,
                    disabled: true,
                };
            }

            return el;
        });
    }, [autotests]);

    const currentQualityGateBranchesOptions = React.useMemo(() => {
        return autotests.length && currentQualityGateAutotestFieldValue
            ? autotests
                  .filter(el => el.name === currentQualityGateAutotestFieldValue)[0]
                  .branches.map(el => ({
                      label: el,
                      value: el,
                  }))
            : [];
    }, [autotests, currentQualityGateAutotestFieldValue]);

    const handleChangeQualityGateType = React.useCallback(
        event => {
            const chosenQualityGateType = event.target.value;

            if (chosenQualityGateType === QUALITY_GATE_TYPES['MANUAL']) {
                resetField(createQualityGateAutotestFieldName(currentQualityGateData.id));
                resetField(
                    createQualityGateTypeAutotestsBranchFieldName(currentQualityGateData.id)
                );
            }

            setQualityGates(prev => {
                const newQualityGates = prev.map(qualityGate => {
                    if (qualityGate.id !== currentQualityGateData.id) {
                        return qualityGate;
                    }

                    if (chosenQualityGateType === QUALITY_GATE_TYPES['MANUAL']) {
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

                setNewQualityGates(newQualityGates);

                return newQualityGates;
            });
        },
        [currentQualityGateData.id, resetField, setNewQualityGates, setQualityGates]
    );

    const handleChangeQualityGateStepName = React.useCallback(
        event => {
            const chosenQualityGateStepName = event.target.value;

            setQualityGates(prev => {
                const newQualityGates = prev.map(qualityGate => {
                    if (qualityGate.id !== currentQualityGateData.id) {
                        return qualityGate;
                    }

                    return {
                        ...qualityGate,
                        stepName: chosenQualityGateStepName,
                    };
                });

                setNewQualityGates(newQualityGates);

                return newQualityGates;
            });
        },
        [currentQualityGateData.id, setNewQualityGates, setQualityGates]
    );

    const handleChangeQualityGateAutotestName = React.useCallback(
        event => {
            const chosenQualityGateAutotest = event.target.value;

            resetField(createQualityGateTypeAutotestsBranchFieldName(currentQualityGateData.id));

            setQualityGates(prev => {
                const newQualityGates = prev.map(qualityGate => {
                    if (qualityGate.id !== currentQualityGateData.id) {
                        return qualityGate;
                    }

                    return {
                        ...qualityGate,
                        autotestName: chosenQualityGateAutotest,
                    };
                });

                setNewQualityGates(newQualityGates);

                return newQualityGates;
            });
        },
        [currentQualityGateData.id, resetField, setNewQualityGates, setQualityGates]
    );

    const handleChangeQualityGateAutotestBranchName = React.useCallback(
        event => {
            const chosenQualityGateAutotestsBranch = event.target.value;

            setQualityGates(prev => {
                const newQualityGates = prev.map(qualityGate => {
                    if (qualityGate.id !== currentQualityGateData.id) {
                        return qualityGate;
                    }

                    return {
                        ...qualityGate,
                        branchName: chosenQualityGateAutotestsBranch,
                    };
                });

                setNewQualityGates(newQualityGates);

                return newQualityGates;
            });
        },
        [currentQualityGateData.id, setNewQualityGates, setQualityGates]
    );

    const availableAutotests = React.useMemo(
        () =>
            autotests.map(autotest => {
                const { name, branches } = autotest;
                const alreadyChosenAutotest = qualityGates.find(
                    ({ autotestName }) => autotestName === name
                );
                const allBranchesAreChosen = branches.every(branch =>
                    qualityGates.find(qualityGate => branch === qualityGate.branchName)
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
        [autotests, qualityGates]
    );

    const availableAutotestBranches = React.useMemo(
        () =>
            currentQualityGateBranchesOptions.map(branchOption => {
                const alreadyChosenAutotestBranch = qualityGates.find(
                    ({ branchName }) => branchOption.value === branchName
                );

                if (alreadyChosenAutotestBranch) {
                    return {
                        ...branchOption,
                        disabled: true,
                    };
                }

                return branchOption;
            }),
        [currentQualityGateBranchesOptions, qualityGates]
    );

    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <FormSelect
                            {...register(
                                createQualityGateTypeFieldName(currentQualityGateData.id),
                                {
                                    onChange: handleChangeQualityGateType,
                                }
                            )}
                            label={'Quality gate type'}
                            placeholder={'Select quality gate type'}
                            control={control}
                            errors={errors}
                            defaultValue={'manual'}
                            options={availableQualityGateTypeSelectOptions}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormTextField
                            {...register(
                                createQualityGateStepNameFieldName(currentQualityGateData.id),
                                {
                                    required: 'Enter step name',
                                    onBlur: handleChangeQualityGateStepName,
                                }
                            )}
                            label={'Step name'}
                            placeholder={'Enter step name'}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Render
                        condition={
                            !!autotests.length &&
                            currentQualityGateTypeFieldValue === QUALITY_GATE_TYPES['AUTOTESTS']
                        }
                    >
                        <>
                            <Grid item xs={3}>
                                <FormSelect
                                    {...register(
                                        createQualityGateAutotestFieldName(
                                            currentQualityGateData.id
                                        ),
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
                                        createQualityGateTypeAutotestsBranchFieldName(
                                            currentQualityGateData.id
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
                    </Render>
                </Grid>
            </Grid>
        </>
    );
};
