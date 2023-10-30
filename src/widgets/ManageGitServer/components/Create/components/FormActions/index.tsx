import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useGitServerCRUD } from '../../../../../../k8s/EDPGitServer/hooks/useGitServerCRUD';
import { createGitServerInstance } from '../../../../../../k8s/EDPGitServer/utils/createGitServerInstance';
import { createGitServerSecretInstance } from '../../../../../../k8s/Secret/utils/createGitServerSecretInstance';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { EDPKubeObjectInterface } from '../../../../../../types/k8s';
import { getUsedValues } from '../../../../../../utils/forms/getUsedValues';
import { GIT_SERVER_FORM_NAMES } from '../../../../names';
import { ManageGitServerDataContext, ManageGitServerValues } from '../../../../types';

export const FormActions = () => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useReactHookFormContext<ManageGitServerValues>();
    const {
        formData: { handleClosePlaceholder },
    } = useFormContext<ManageGitServerDataContext>();

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
    } = useGitServerCRUD({
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
                    <Button onClick={handleClosePlaceholder} size="small" component={'button'}>
                        cancel
                    </Button>
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
