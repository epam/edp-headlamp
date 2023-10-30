import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useGitServerCRUD } from '../../../../../../k8s/EDPGitServer/hooks/useGitServerCRUD';
import { editGitServerInstance } from '../../../../../../k8s/EDPGitServer/utils/editGitServerInstance';
import { useFormContext } from '../../../../../../providers/Form/hooks';
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
        formData: { currentElement },
    } = useFormContext<ManageGitServerDataContext>();

    const {
        editGitServer,
        mutations: {
            gitServerCreateMutation,
            gitServerSecretCreateMutation,
            gitServerSecretDeleteMutation,
        },
    } = useGitServerCRUD({});

    const isLoading =
        gitServerCreateMutation.isLoading ||
        gitServerSecretCreateMutation.isLoading ||
        gitServerSecretDeleteMutation.isLoading;

    const onSubmit = React.useCallback(
        async (values: ManageGitServerValues) => {
            if (typeof currentElement === 'string') {
                return;
            }

            // TODO: fix this
            const transformedValues = {
                ...values,
                sshPort: Number(values.sshPort),
                httpsPort: Number(values.httpsPort),
            };
            const usedValues = getUsedValues(transformedValues, GIT_SERVER_FORM_NAMES);

            const gitServerData = editGitServerInstance(
                GIT_SERVER_FORM_NAMES,
                currentElement,
                usedValues
            );

            await editGitServer({
                gitServerData: gitServerData,
            });
        },
        [currentElement, editGitServer]
    );

    return (
        <>
            <Grid container spacing={2} justifyContent={'flex-end'}>
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
        </>
    );
};
