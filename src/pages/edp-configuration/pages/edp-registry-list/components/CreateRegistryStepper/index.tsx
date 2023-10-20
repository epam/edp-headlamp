import { Button, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoadingWrapper } from '../../../../../../components/LoadingWrapper';
import { Render } from '../../../../../../components/Render';
import {
    CONTAINER_REGISTRY_PLATFORM,
    CONTAINER_REGISTRY_TYPE,
    CONTAINER_REGISTRY_TYPE_BY_PLATFORM,
} from '../../../../../../k8s/ConfigMap/constants';
import { useConfigMapCRUD } from '../../../../../../k8s/ConfigMap/hooks/useConfigMapCRUD';
import { editEDPConfigConfigMap } from '../../../../../../k8s/ConfigMap/utils/editEDPConfigConfigMap';
import { FormSelect } from '../../../../../../providers/Form/components/FormSelect';
import { FieldEvent } from '../../../../../../types/forms';
import { ValueOf } from '../../../../../../types/global';
import { EDP_CONFIG_MAP_NAMES } from '../../names';
import { useDynamicDataContext } from '../../providers/DynamicData/hooks';
import { DockerHubRegistryConfiguration } from '../DockerHubRegistryConfiguration';
import { ECRConfiguration } from '../ECRConfiguration';
import { HarborRegistryConfiguration } from '../HarborRegistryConfiguration';
import { OpenshiftRegistrySecretsList } from '../OpenshiftRegistrySecretsList';

const createRegistryTypeOptions = (platformName: ValueOf<typeof CONTAINER_REGISTRY_PLATFORM>) => {
    if (!platformName || !CONTAINER_REGISTRY_TYPE_BY_PLATFORM?.[platformName]) {
        return [];
    }

    return CONTAINER_REGISTRY_TYPE_BY_PLATFORM[platformName].map(value => ({
        label: value,
        value: value,
    }));
};

function getSteps() {
    return ['Set registry type', 'Manage registry secrets'];
}

export const CreateRegistryStepper = () => {
    const [registryType, setRegistryType] =
        React.useState<ValueOf<typeof CONTAINER_REGISTRY_TYPE>>(undefined);
    const [activeStep, setActiveStep] = React.useState(0);

    const { editConfigMap } = useConfigMapCRUD({
        onSuccess: () => {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        },
    });

    const { EDPConfigMap: data } = useDynamicDataContext();
    const configMapIsLoading = data === null;
    const platform = data?.data?.platform;

    React.useEffect(() => {
        const containerRegistryType = data?.data?.container_registry_type;

        if (!containerRegistryType) {
            return;
        }
        setActiveStep(1);
        setRegistryType(containerRegistryType);
    }, [data]);

    const {
        control,
        register,
        formState: { errors },
        resetField,
    } = useForm();

    const handleNext = React.useCallback(async () => {
        if (configMapIsLoading || !data) {
            return;
        }

        const newEDPConfigMap = editEDPConfigConfigMap(EDP_CONFIG_MAP_NAMES, data, {
            registryType,
        });

        await editConfigMap({ configMapData: newEDPConfigMap });
        resetField('registryTypeChooser');
    }, [configMapIsLoading, data, editConfigMap, registryType, resetField]);

    const registryTypeOptions = React.useMemo(
        () => createRegistryTypeOptions(platform),
        [platform]
    );

    const steps = getSteps();

    const renderSecretsList = React.useCallback(() => {
        switch (registryType) {
            case CONTAINER_REGISTRY_TYPE.ECR:
                return <ECRConfiguration setActiveStep={setActiveStep} />;
            case CONTAINER_REGISTRY_TYPE.DOCKER_HUB:
                return <DockerHubRegistryConfiguration setActiveStep={setActiveStep} />;
            case CONTAINER_REGISTRY_TYPE.HARBOR:
                return <HarborRegistryConfiguration setActiveStep={setActiveStep} />;
            case CONTAINER_REGISTRY_TYPE.OPENSHIFT_REGISTRY:
                return <OpenshiftRegistrySecretsList />;
            default:
                break;
        }
    }, [registryType]);

    const renderStepContent = React.useCallback(
        (step: number) => {
            switch (step) {
                case 0:
                    return (
                        <FormSelect
                            {...register('registryTypeChooser', {
                                required: 'Select a registry type you would like to create.',
                                onChange: ({ target: { value } }: FieldEvent) => {
                                    setRegistryType(value);
                                },
                            })}
                            label={'Registry Type'}
                            title={'Select a registry type you would like to create'}
                            placeholder={'Select a registry type you would like to create'}
                            control={control}
                            errors={errors}
                            options={registryTypeOptions}
                            defaultValue={registryType}
                        />
                    );
                case 1:
                    return renderSecretsList();
                default:
                    return 'Unknown step';
            }
        },
        [control, errors, register, registryType, registryTypeOptions, renderSecretsList]
    );

    return (
        <LoadingWrapper isLoading={configMapIsLoading}>
            <Grid container spacing={4}>
                <Render condition={!data?.data?.container_registry_type}>
                    <Grid item xs={12}>
                        <Alert severity="info" variant="outlined">
                            Registry type is unset.
                        </Alert>
                    </Grid>
                </Render>
                <Grid item xs={12}>
                    <Grid container spacing={4} wrap={'nowrap'}>
                        <Grid item style={{ flexShrink: 0 }}>
                            <Stepper
                                activeStep={activeStep}
                                orientation="vertical"
                                style={{ padding: 0 }}
                            >
                                {steps.map(label => {
                                    const stepProps: { completed?: boolean } = {};
                                    const labelProps: { optional?: React.ReactNode } = {};

                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </Grid>
                        <Grid item style={{ flexGrow: 1 }}>
                            {renderStepContent(activeStep)}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2} justifyContent={'flex-end'}>
                        <Render condition={activeStep === 0}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    disabled={!registryType}
                                >
                                    Continue
                                </Button>
                            </Grid>
                        </Render>
                    </Grid>
                </Grid>
            </Grid>
        </LoadingWrapper>
    );
};
