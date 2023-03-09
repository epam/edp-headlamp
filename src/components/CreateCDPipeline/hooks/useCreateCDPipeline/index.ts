import { useMutation, UseMutationResult } from 'react-query';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useNamespace } from '../../../../hooks/useNamespace';
import { useRequestStatusMessages } from '../../../../hooks/useResourceRequestStatusMessages';
import { EDPCDPipelineKubeObject } from '../../../../k8s/EDPCDPipeline';
import { EDPCDPipelineKubeObjectInterface } from '../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObject } from '../../../../k8s/EDPCDPipelineStage';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../k8s/EDPCDPipelineStage/types';
import { React } from '../../../../plugin.globals';

interface CreateCDPipelineProps {
    CDPipelineData: EDPCDPipelineKubeObjectInterface;
    CDPipelineStagesData: EDPCDPipelineStageKubeObjectInterface[];
}

export const useCreateCDPipeline = ({
    onSuccess,
    onError,
}: {
    onSuccess?: () => void;
    onError?: () => void;
}): {
    createCDPipeline: (props: CreateCDPipelineProps) => Promise<void>;
    mutations: {
        CDPipelineCreateMutation: UseMutationResult<
            EDPCDPipelineKubeObjectInterface,
            Error,
            { CDPipelineData: EDPCDPipelineKubeObjectInterface }
        >;
        CDPipelineDeleteMutation: UseMutationResult<
            void,
            Error,
            { CDPipelineData: EDPCDPipelineKubeObjectInterface }
        >;
        CDPipelineStageCreateMutation: UseMutationResult<
            EDPCDPipelineStageKubeObjectInterface,
            Error,
            { CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface }
        >;
        CDPipelineStageDeleteMutation: UseMutationResult<
            void,
            Error,
            { CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface }
        >;
    };
} => {
    const { namespace } = useNamespace();
    const { showBeforeRequestMessage, showRequestErrorMessage, showRequestSuccessMessage } =
        useRequestStatusMessages();

    const CDPipelineCreateMutation = useMutation<
        EDPCDPipelineKubeObjectInterface,
        Error,
        {
            CDPipelineData: EDPCDPipelineKubeObjectInterface;
        }
    >(
        'CDPipelineCreateMutation',
        ({ CDPipelineData }) => {
            return EDPCDPipelineKubeObject.apiEndpoint.post(CDPipelineData);
        },
        {
            onMutate: ({ CDPipelineData }) =>
                showBeforeRequestMessage(CDPipelineData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { CDPipelineData }) => {
                showRequestSuccessMessage(CDPipelineData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { CDPipelineData }) => {
                showRequestErrorMessage(CDPipelineData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const CDPipelineDeleteMutation = useMutation<
        void,
        Error,
        {
            CDPipelineData: EDPCDPipelineKubeObjectInterface;
        }
    >(
        'CDPipelineDeleteMutation',
        ({ CDPipelineData }) => {
            return EDPCDPipelineKubeObject.apiEndpoint.delete(
                namespace,
                CDPipelineData.metadata.name
            );
        },
        {
            onMutate: ({ CDPipelineData }) =>
                showBeforeRequestMessage(CDPipelineData.metadata.name, CRUD_TYPES.DELETE),
            onSuccess: (data, { CDPipelineData }) =>
                showRequestSuccessMessage(CDPipelineData.metadata.name, CRUD_TYPES.DELETE),
            onError: (error, { CDPipelineData }) => {
                showRequestErrorMessage(CDPipelineData.metadata.name, CRUD_TYPES.DELETE);
                console.error(error);
            },
        }
    );

    const CDPipelineStageCreateMutation = useMutation<
        EDPCDPipelineStageKubeObjectInterface,
        Error,
        {
            CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
        }
    >(
        'CDPipelineStageCreateMutation',
        ({ CDPipelineStageData }) => {
            return EDPCDPipelineStageKubeObject.apiEndpoint.post(CDPipelineStageData);
        },
        {
            onMutate: ({ CDPipelineStageData }) =>
                showBeforeRequestMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { CDPipelineStageData }) => {
                showRequestSuccessMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.CREATE);
            },
            onError: (error, { CDPipelineStageData }) => {
                showRequestErrorMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.CREATE);
            },
        }
    );

    const CDPipelineStageDeleteMutation = useMutation<
        void,
        Error,
        {
            CDPipelineStageData: EDPCDPipelineStageKubeObjectInterface;
        }
    >(
        'CDPipelineStageDeleteMutation',
        ({ CDPipelineStageData }) => {
            return EDPCDPipelineStageKubeObject.apiEndpoint.delete(
                namespace,
                CDPipelineStageData.metadata.name
            );
        },
        {
            onMutate: ({ CDPipelineStageData }) =>
                showBeforeRequestMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.DELETE),
            onSuccess: (data, { CDPipelineStageData }) =>
                showRequestSuccessMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.DELETE),
            onError: (error, { CDPipelineStageData }) => {
                showRequestErrorMessage(CDPipelineStageData.metadata.name, CRUD_TYPES.DELETE);
                console.error(error);
            },
        }
    );

    const createCDPipeline = React.useCallback(
        async ({ CDPipelineData, CDPipelineStagesData }: CreateCDPipelineProps) => {
            CDPipelineCreateMutation.mutate(
                { CDPipelineData },
                {
                    onSuccess: async () => {
                        const createdStages: EDPCDPipelineStageKubeObjectInterface[] = [];

                        for await (const stage of CDPipelineStagesData) {
                            await CDPipelineStageCreateMutation.mutate(
                                { CDPipelineStageData: stage },
                                {
                                    onSuccess: (data, { CDPipelineStageData }) => {
                                        createdStages.push(CDPipelineStageData);

                                        if (onSuccess) {
                                            onSuccess();
                                        }
                                    },
                                    onError: async () => {
                                        CDPipelineDeleteMutation.mutate({ CDPipelineData });

                                        for await (const createdStage of createdStages) {
                                            await CDPipelineStageDeleteMutation.mutate({
                                                CDPipelineStageData: createdStage,
                                            });
                                        }

                                        if (onError) {
                                            onError();
                                        }
                                    },
                                }
                            );
                        }
                    },
                    onError: () => {
                        CDPipelineDeleteMutation.mutate({
                            CDPipelineData,
                        });

                        if (onError) {
                            onError();
                        }
                    },
                }
            );
        },
        [
            CDPipelineCreateMutation,
            CDPipelineDeleteMutation,
            CDPipelineStageCreateMutation,
            CDPipelineStageDeleteMutation,
            onError,
            onSuccess,
        ]
    );

    const mutations = {
        CDPipelineCreateMutation,
        CDPipelineDeleteMutation,
        CDPipelineStageCreateMutation,
        CDPipelineStageDeleteMutation,
    };

    return { createCDPipeline, mutations };
};
