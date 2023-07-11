import { KubeObjectIface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { getDefaultNamespace } from '../../utils/getDefaultNamespace';
import { useRequestStatusMessages } from '../useResourceRequestStatusMessages';

type UseResourceCRUDMutationReturnType<
    KubeObjectData,
    Mode extends CRUD_TYPES
> = Mode extends CRUD_TYPES.DELETE ? void : KubeObjectData;

export const useResourceCRUDMutation = <
    KubeObjectData extends EDPKubeObjectInterface,
    Mode extends CRUD_TYPES
>(
    mutationKey: string,
    kubeObject: KubeObjectIface<any>,
    mode: Mode,
    showMessages: boolean = true
): UseMutationResult<
    UseResourceCRUDMutationReturnType<KubeObjectData, Mode>,
    Error,
    KubeObjectData
> => {
    const {
        showBeforeRequestMessage,
        showRequestErrorMessage,
        showRequestSuccessMessage,
        showRequestErrorDetailedMessage,
    } = useRequestStatusMessages();

    const namespace = getDefaultNamespace();

    return useMutation<
        UseResourceCRUDMutationReturnType<KubeObjectData, Mode>,
        Error,
        KubeObjectData
    >(
        mutationKey,
        data => {
            let dataCopy = { ...data };

            if (!data.metadata?.namespace) {
                dataCopy = {
                    ...dataCopy,
                    metadata: {
                        ...dataCopy.metadata,
                        namespace,
                    },
                };
            }

            switch (mode) {
                case CRUD_TYPES.CREATE:
                    return kubeObject.apiEndpoint.post(dataCopy);
                case CRUD_TYPES.EDIT:
                    return kubeObject.apiEndpoint.put(dataCopy);
                case CRUD_TYPES.DELETE:
                    return kubeObject.apiEndpoint.delete(
                        dataCopy.metadata.namespace,
                        dataCopy.metadata.name
                    );
            }
        },
        {
            onMutate: variables =>
                showMessages &&
                showBeforeRequestMessage(variables.kind, variables.metadata.name, mode),
            onSuccess: (data, variables) => {
                showMessages &&
                    showRequestSuccessMessage(variables.kind, variables.metadata.name, mode);
            },
            onError: (error, variables) => {
                showMessages &&
                    showRequestErrorMessage(variables.kind, variables.metadata.name, mode);
                showMessages && showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );
};
