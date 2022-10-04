import { useFormContext } from 'react-hook-form';
import { qualityGateTypes } from '../../../../../../configs/qualityGateTypes';
import { MuiCore, React } from '../../../../../../plugin.globals';
import { FormSelect } from '../../../../../FormComponents';
import { FormTextField } from '../../../../../FormComponents/FormTextField';
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

    const availableQualityGatesTypes = React.useMemo(() => {
        return qualityGateTypes.map(el => {
            if (el.value === 'autotests' && !autotests.length) {
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

            if (chosenQualityGateType === 'manual') {
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

                    if (chosenQualityGateType === 'manual') {
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
                            placeholder={'Choose quality gate type'}
                            title={'Choose quality gate type'}
                            control={control}
                            errors={errors}
                            defaultValue={'manual'}
                            options={availableQualityGatesTypes}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormTextField
                            {...register(
                                createQualityGateStepNameFieldName(currentQualityGateData.id),
                                {
                                    onBlur: handleChangeQualityGateStepName,
                                }
                            )}
                            label={'Step name'}
                            title={'Enter step name'}
                            placeholder={'Enter step name'}
                            control={control}
                            errors={errors}
                        />
                    </Grid>
                    <Render
                        condition={
                            !!autotests.length && currentQualityGateTypeFieldValue === 'autotests'
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
                                    label={'Autotests'}
                                    placeholder={'Choose autotest'}
                                    title={'Choose autotest'}
                                    control={control}
                                    errors={errors}
                                    options={autotests.map(({ name }) => ({
                                        label: name,
                                        value: name,
                                    }))}
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
                                    label={'Autotests branch'}
                                    placeholder={'Choose autotests branch'}
                                    title={'Choose autotests branch'}
                                    control={control}
                                    errors={errors}
                                    disabled={!currentQualityGateBranchesOptions.length}
                                    options={currentQualityGateBranchesOptions}
                                />
                            </Grid>
                        </>
                    </Render>
                </Grid>
            </Grid>
        </>
    );
};
