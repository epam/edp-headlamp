import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { useCreateClusterSecret } from '../../../../k8s/Secret/hooks/useCreateClusterSecret';
import { createClusterSecretInstance } from '../../../../k8s/Secret/utils/createClusterSecretInstance';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CLUSTER_CREATION_FORM_NAMES } from '../../names';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../types';

export const FormActions = () => {
    const {
        formData: { currentElement, handleClosePlaceholder, isReadOnly },
    } = useFormContext<ManageClusterSecretDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';
    const mode = isPlaceholder ? FORM_MODES.CREATE : FORM_MODES.EDIT;

    const {
        reset,
        formState: { isDirty },
        getValues,
        handleSubmit,
    } = useReactHookFormContext<ManageClusterSecretValues>();

    const handleClose = React.useCallback(() => {
        reset();
        handleClosePlaceholder();
    }, [handleClosePlaceholder, reset]);

    const {
        createClusterSecret,
        mutations: { clusterSecretCreateMutation },
    } = useCreateClusterSecret({
        onSuccess: handleClose,
    });

    const isLoading = React.useMemo(
        () => clusterSecretCreateMutation.isLoading,
        [clusterSecretCreateMutation.isLoading]
    );

    const onSubmit = React.useCallback(async () => {
        const values = getValues();
        const { clusterName, clusterHost, clusterToken, clusterCertificate } = getUsedValues(
            values,
            CLUSTER_CREATION_FORM_NAMES
        );

        const newClusterSecretData = createClusterSecretInstance({
            clusterName,
            clusterHost,
            clusterToken,
            clusterCertificate,
        });

        await createClusterSecret({
            clusterSecretData: newClusterSecretData,
        });
        reset();
    }, [createClusterSecret, getValues, reset]);

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item>
                    <Render condition={mode === FORM_MODES.CREATE}>
                        <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
                            cancel
                        </Button>
                    </Render>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item>
                            <Button
                                onClick={() => reset()}
                                size="small"
                                component={'button'}
                                disabled={!isDirty || isReadOnly}
                            >
                                undo changes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type={'button'}
                                size={'small'}
                                component={'button'}
                                variant={'contained'}
                                color={'primary'}
                                disabled={isLoading || isReadOnly || !isDirty}
                                onClick={handleSubmit(onSubmit)}
                            >
                                save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
