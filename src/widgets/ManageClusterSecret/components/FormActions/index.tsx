import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { useSecretCRUD } from '../../../../k8s/Secret/hooks/useSecretCRUD';
import { createClusterSecretInstance } from '../../../../k8s/Secret/utils/createClusterSecretInstance';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { CLUSTER_CREATION_FORM_NAMES } from '../../names';
import { ManageClusterSecretDataContext, ManageClusterSecretValues } from '../../types';

export const FormActions = () => {
    const {
        formData: { currentElement, handleClosePlaceholder },
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
        if (mode === FORM_MODES.CREATE) {
            reset();
            handleClosePlaceholder();
        }
    }, [handleClosePlaceholder, mode, reset]);

    const {
        createSecret,
        editSecret,
        mutations: { secretCreateMutation, secretEditMutation },
    } = useSecretCRUD({
        onSuccess: handleClose,
    });

    const isLoading = React.useMemo(
        () => secretCreateMutation.isLoading || secretEditMutation.isLoading,
        [secretCreateMutation, secretEditMutation]
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

        if (mode === FORM_MODES.CREATE) {
            await createSecret({
                secretData: newClusterSecretData,
            });
        } else {
            await editSecret({
                secretData: newClusterSecretData,
            });
        }

        reset();
    }, [createSecret, editSecret, getValues, mode, reset]);

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
                                disabled={!isDirty}
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
                                disabled={isLoading || !isDirty}
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
