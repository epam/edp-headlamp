import { useMutation, UseMutationResult } from 'react-query';
import {
    createApplicationInstance,
    editApplicationInstance,
} from '../../../../../../../../../../../../configs/k8s-resource-instances/custom-resources/application';
import { CRUD_TYPES } from '../../../../../../../../../../../../constants/crudTypes';
import { EnrichedApplication } from '../../../../../../../../../../../../hooks/useApplicationsInCDPipeline';
import { useNamespace } from '../../../../../../../../../../../../hooks/useNamespace';
import { useRequestStatusMessages } from '../../../../../../../../../../../../hooks/useResourceRequestStatusMessages';
import { ApplicationKubeObject } from '../../../../../../../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/Application/types';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPGitServer/types';
import { React } from '../../../../../../../../../../../../plugin.globals';

interface CreateArgoApplicationProps {
    gitServers: EDPGitServerKubeObjectInterface[];
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    enrichedApplication: EnrichedApplication;
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    imageTag: string;
}

interface EditArgoApplicationProps {
    argoApplication: ApplicationKubeObjectInterface;
    enrichedApplication: EnrichedApplication;
    imageTag: string;
}

interface DeleteArgoApplicationProps {
    argoApplication: ApplicationKubeObjectInterface;
}

export const useCreateArgoApplication = (): {
    createArgoApplication: (props: CreateArgoApplicationProps) => Promise<void>;
    editArgoApplication: (props: EditArgoApplicationProps) => Promise<void>;
    deleteArgoApplication: (props: DeleteArgoApplicationProps) => Promise<void>;
    mutations: {
        argoApplicationCreateMutation: UseMutationResult<
            ApplicationKubeObjectInterface,
            Error,
            { argoApplicationData: ApplicationKubeObjectInterface }
        >;
        argoApplicationEditMutation: UseMutationResult<
            ApplicationKubeObjectInterface,
            Error,
            { argoApplicationData: ApplicationKubeObjectInterface }
        >;
        argoApplicationDeleteMutation: UseMutationResult<
            void,
            Error,
            { argoApplicationData: ApplicationKubeObjectInterface }
        >;
    };
} => {
    const { namespace } = useNamespace();
    const {
        showBeforeRequestMessage,
        showRequestErrorMessage,
        showRequestSuccessMessage,
        showRequestErrorDetailedMessage,
    } = useRequestStatusMessages();

    const argoApplicationCreateMutation = useMutation<
        ApplicationKubeObjectInterface,
        Error,
        {
            argoApplicationData: ApplicationKubeObjectInterface;
        }
    >(
        'argoApplicationCreateMutation',
        ({ argoApplicationData }) => {
            return ApplicationKubeObject.apiEndpoint.post(argoApplicationData);
        },
        {
            onMutate: ({ argoApplicationData }) =>
                showBeforeRequestMessage(argoApplicationData.metadata.name, CRUD_TYPES.CREATE),
            onSuccess: (data, { argoApplicationData }) =>
                showRequestSuccessMessage(argoApplicationData.metadata.name, CRUD_TYPES.CREATE),
            onError: (error, { argoApplicationData }) => {
                showRequestErrorMessage(argoApplicationData.metadata.name, CRUD_TYPES.CREATE);
                showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );

    const argoApplicationEditMutation = useMutation<
        ApplicationKubeObjectInterface,
        Error,
        {
            argoApplicationData: ApplicationKubeObjectInterface;
        }
    >(
        'argoApplicationEditMutation',
        ({ argoApplicationData }) => {
            return ApplicationKubeObject.apiEndpoint.put(argoApplicationData);
        },
        {
            onMutate: ({ argoApplicationData }) =>
                showBeforeRequestMessage(argoApplicationData.metadata.name, CRUD_TYPES.EDIT),
            onSuccess: (data, { argoApplicationData }) =>
                showRequestSuccessMessage(argoApplicationData.metadata.name, CRUD_TYPES.EDIT),
            onError: (error, { argoApplicationData }) => {
                showRequestErrorMessage(argoApplicationData.metadata.name, CRUD_TYPES.EDIT);
                showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );

    const argoApplicationDeleteMutation = useMutation<
        void,
        Error,
        {
            argoApplicationData: ApplicationKubeObjectInterface;
        }
    >(
        'argoApplicationDeleteMutation',
        ({ argoApplicationData }) => {
            return ApplicationKubeObject.apiEndpoint.delete(
                namespace,
                argoApplicationData.metadata.name
            );
        },
        {
            onMutate: ({ argoApplicationData }) =>
                showBeforeRequestMessage(argoApplicationData.metadata.name, CRUD_TYPES.DELETE),
            onSuccess: (data, { argoApplicationData }) =>
                showRequestSuccessMessage(argoApplicationData.metadata.name, CRUD_TYPES.DELETE),
            onError: (error, { argoApplicationData }) => {
                showRequestErrorMessage(argoApplicationData.metadata.name, CRUD_TYPES.DELETE);
                showRequestErrorDetailedMessage(error);
                console.error(error);
            },
        }
    );

    const createArgoApplication = React.useCallback(
        async ({
            gitServers,
            CDPipeline,
            currentCDPipelineStage,
            enrichedApplication,
            imageStream,
            imageTag,
        }: CreateArgoApplicationProps): Promise<void> => {
            const [gitServer] = gitServers.filter(
                el => el.metadata.name === enrichedApplication.application.spec.gitServer
            );

            const argoApplicationData = createApplicationInstance({
                CDPipeline,
                currentCDPipelineStage,
                enrichedApplication,
                imageStream,
                imageTag,
                gitServer,
            });

            argoApplicationCreateMutation.mutate({ argoApplicationData });
        },
        [argoApplicationCreateMutation]
    );

    const editArgoApplication = React.useCallback(
        async ({
            argoApplication,
            enrichedApplication,
            imageTag,
        }: EditArgoApplicationProps): Promise<void> => {
            const argoApplicationData: ApplicationKubeObjectInterface = editApplicationInstance({
                argoApplication,
                enrichedApplication,
                imageTag,
            });

            argoApplicationEditMutation.mutate({ argoApplicationData });
        },
        [argoApplicationEditMutation]
    );

    const deleteArgoApplication = React.useCallback(
        async ({ argoApplication }: DeleteArgoApplicationProps): Promise<void> => {
            argoApplicationDeleteMutation.mutate({ argoApplicationData: argoApplication });
        },
        [argoApplicationDeleteMutation]
    );

    const mutations = {
        argoApplicationCreateMutation,
        argoApplicationEditMutation,
        argoApplicationDeleteMutation,
    };

    return { createArgoApplication, editArgoApplication, deleteArgoApplication, mutations };
};
