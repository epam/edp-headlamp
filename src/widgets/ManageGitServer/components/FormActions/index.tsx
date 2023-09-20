import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { Render } from '../../../../components/Render';
import { useCreateGitServer } from '../../../../k8s/EDPGitServer/hooks/useCreateGitServer';
import { createGitServerInstance } from '../../../../k8s/EDPGitServer/utils/createGitServerInstance';
import { createGitServerSecretInstance } from '../../../../k8s/Secret/utils/createGitServerSecretInstance';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { EDPKubeObjectInterface } from '../../../../types/k8s';
import { getUsedValues } from '../../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../types';

export const FormActions = () => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useReactHookFormContext<ManageGitServerValues>();
    const {
        formData: { currentElement, handleClosePlaceholder, isReadOnly },
    } = useFormContext<ManageGitServerDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';
    const mode = isPlaceholder ? FORM_MODES.CREATE : FORM_MODES.EDIT;

    const handleClose = React.useCallback(() => {
        reset();
        handleClosePlaceholder();
    }, [handleClosePlaceholder, reset]);

    const {
        createGitServer,
        mutations: {
            gitServerCreateMutation,
            gitServerSecretCreateMutation,
            gitServerSecretDeleteMutation,
        },
    } = useCreateGitServer({
        onSuccess: handleClose,
    });

    const isLoading =
        gitServerCreateMutation.isLoading ||
        gitServerSecretCreateMutation.isLoading ||
        gitServerSecretDeleteMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageGitServerValues) => {
            // TODO: fix this
            const transformedValues = {
                ...values,
                sshPort: Number(values.sshPort),
                httpsPort: Number(values.httpsPort),
            };
            const usedValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);
            const { gitUser, sshPrivateKey, token, gitProvider } = transformedValues;

            const gitServerData = createGitServerInstance(GIT_SERVER_FORM_NAMES, usedValues);

            const gitServerSecretData = createGitServerSecretInstance({
                name: gitServerData.metadata.name,
                gitUser,
                sshPrivateKey,
                token,
                gitProvider,
            });

            await createGitServer({
                gitServerData: gitServerData,
                gitServerSecretData: gitServerSecretData as EDPKubeObjectInterface,
            });
        },
        [createGitServer]
    );

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
