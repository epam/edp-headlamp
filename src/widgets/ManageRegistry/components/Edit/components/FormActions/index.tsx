import { Icon } from '@iconify/react';
import { Button, Grid, Tooltip } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { ConditionalWrapper } from '../../../../../../components/ConditionalWrapper';
import { ICONS } from '../../../../../../icons/iconify-icons-mapping';
import { useDialogContext } from '../../../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../../../providers/Form/hooks';
import { CONFIRM_RESOURCES_UPDATES_DIALOG_NAME } from '../../../../../ConfirmResourcesUpdates/constants';
import { ManageRegistryDataContext, ManageRegistryValues } from '../../../../types';
import { useResetRegistry } from './hooks/useResetRegistry';
import { useUpdateRegistry } from './hooks/useUpdateRegistry';

export const FormActions = () => {
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
        getValues,
    } = useReactHookFormContext<ManageRegistryValues>();

    const {
        formData: { handleClosePanel, pullAccountSecret, pushAccountSecret },
    } = useFormContext<ManageRegistryDataContext>();

    const { setDialog } = useDialogContext();

    const { updateRegistry, isLoading: updateRegistryIsLoading } = useUpdateRegistry({
        onSuccess: () => {
            const values = getValues();
            reset(values);
        },
    });

    const { resetRegistry, isLoading: resetRegistryIsLoading } = useResetRegistry({
        onSuccess: () => {
            handleClosePanel();
        },
    });

    const onSubmit = React.useCallback(
        async (values: ManageRegistryValues) => {
            await updateRegistry(values);
        },
        [updateRegistry]
    );

    const isLoading = updateRegistryIsLoading || resetRegistryIsLoading;

    const someOfTheSecretsHasExternalOwner = React.useMemo(() => {
        if (pushAccountSecret && pushAccountSecret.metadata.ownerReferences) {
            return true;
        } else if (pullAccountSecret && pullAccountSecret.metadata.ownerReferences) {
            return true;
        }

        return false;
    }, [pullAccountSecret, pushAccountSecret]);

    const resetButtonDisabled =
        !pushAccountSecret || !pullAccountSecret || someOfTheSecretsHasExternalOwner;

    return (
        <>
            <Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                <Grid item style={{ marginRight: 'auto' }}>
                    <ConditionalWrapper
                        condition={someOfTheSecretsHasExternalOwner}
                        wrapper={children => {
                            return (
                                <Tooltip
                                    title={
                                        'Some of the secrets has external owners. Please, delete it by your own.'
                                    }
                                >
                                    {children}
                                </Tooltip>
                            );
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ pointerEvents: 'auto' }}
                            onClick={() => {
                                const formValues = getValues();
                                setDialog({
                                    modalName: CONFIRM_RESOURCES_UPDATES_DIALOG_NAME,
                                    forwardedProps: {
                                        deleteCallback: () => resetRegistry(formValues),
                                        text: 'Are you sure you want to reset the registry?',
                                    },
                                });
                            }}
                            startIcon={<Icon icon={ICONS.WARNING} />}
                            disabled={resetButtonDisabled}
                        >
                            Reset registry
                        </Button>
                    </ConditionalWrapper>
                </Grid>
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
                        disabled={!isDirty || isLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
