import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useFormContext as useReactHookFormContext } from 'react-hook-form';
import { useConfigMapCRUD } from '../../../../k8s/ConfigMap/hooks/useConfigMapCRUD';
import { editEDPConfigConfigMap } from '../../../../k8s/ConfigMap/utils/editEDPConfigConfigMap';
import { useSecretCRUD } from '../../../../k8s/Secret/hooks/useRegistrySecretCRUD';
import { createECRSecretInstance } from '../../../../k8s/Secret/utils/createRegistrySecretInstance';
import { useEditServiceAccount } from '../../../../k8s/ServiceAccount/hooks/useEditServiceAccount';
import { ServiceAccountKubeObjectInterface } from '../../../../k8s/ServiceAccount/types';
import { editServiceAccountInstance } from '../../../../k8s/ServiceAccount/utils/editServiceAccount';
import { EDP_CONFIG_MAP_NAMES } from '../../../../pages/edp-configuration/pages/edp-registry-list/names';
import { useDynamicDataContext } from '../../../../pages/edp-configuration/pages/edp-registry-list/providers/DynamicData/hooks';
import { useSpecificDialogContext } from '../../../../providers/Dialog/hooks';
import { useFormContext } from '../../../../providers/Form/hooks';
import { FORM_MODES } from '../../../../types/forms';
import { DELETE_KUBE_OBJECT_DIALOG_NAME } from '../../../DeleteKubeObject/constants';
import { DeleteKubeObjectDialogForwardedProps } from '../../../DeleteKubeObject/types';
import { ECR_REGISTRY_FORM_NAMES } from '../../names';
import { ManageECRRegistryFormDataContext, ManageECRRegistryFormValues } from '../../types';

export const FormActions = () => {
    const { closeDialog } = useSpecificDialogContext<DeleteKubeObjectDialogForwardedProps>(
        DELETE_KUBE_OBJECT_DIALOG_NAME
    );
    const {
        reset,
        formState: { isDirty },
        handleSubmit,
    } = useReactHookFormContext<ManageECRRegistryFormValues>();

    const {
        formData: { currentElement, tektonServiceAccount, handleClosePlaceholder },
    } = useFormContext<ManageECRRegistryFormDataContext>();

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';
    const mode = isPlaceholder ? FORM_MODES.CREATE : FORM_MODES.EDIT;

    const {
        editServiceAccount,
        mutations: { serviceAccountEditMutation },
    } = useEditServiceAccount({
        onSuccess: async () => {
            closeDialog();
        },
    });

    const { EDPConfigMap: data } = useDynamicDataContext();
    const configMapIsLoading = data === null;
    const { editConfigMap } = useConfigMapCRUD({});

    const { createSecret, editSecret } = useSecretCRUD({
        onSuccess: async () => {
            closeDialog();

            if (mode === FORM_MODES.CREATE) {
                handleClosePlaceholder();
            }
        },
    });

    const isLoading = serviceAccountEditMutation.isLoading || configMapIsLoading;

    const onSubmit = React.useCallback(
        async (values: ManageECRRegistryFormValues) => {
            const { name, registrySpace, registryHost, irsaRoleArn } = values;

            const newECRSecretInstance = createECRSecretInstance({ name });

            const editedServiceAccount = editServiceAccountInstance(
                {
                    irsaRoleArn: ECR_REGISTRY_FORM_NAMES.irsaRoleArn,
                },
                tektonServiceAccount as ServiceAccountKubeObjectInterface,
                {
                    irsaRoleArn,
                }
            );

            const newEDPConfigMap = editEDPConfigConfigMap(EDP_CONFIG_MAP_NAMES, data, {
                registryHost,
                registrySpace,
            });

            await editConfigMap({ configMapData: newEDPConfigMap });
            await editServiceAccount({ serviceAccount: editedServiceAccount });
            if (mode === FORM_MODES.CREATE) {
                await createSecret({ secretData: newECRSecretInstance });
            } else {
                await editSecret({ secretData: newECRSecretInstance });
            }
            setTimeout(() => reset(), 100);
        },
        [
            createSecret,
            data,
            editConfigMap,
            editSecret,
            editServiceAccount,
            mode,
            reset,
            tektonServiceAccount,
        ]
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
