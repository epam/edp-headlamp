import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../constants/crudTypes';
import { KubeObjectIface } from '../../plugin.types';
import { EDPKubeObjectInterface } from '../../types/k8s';
import { useNamespace } from '../useNamespace';
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
    mode: Mode
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

    const { namespace } = useNamespace();

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
                showBeforeRequestMessage(variables.kind, variables.metadata.name, mode),
            onSuccess: (data, variables) => {
                showRequestSuccessMessage(variables.kind, variables.metadata.name, mode);
            },
            onError: (error, variables) => {
                showRequestErrorMessage(variables.kind, variables.metadata.name, mode);
                showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );
};
