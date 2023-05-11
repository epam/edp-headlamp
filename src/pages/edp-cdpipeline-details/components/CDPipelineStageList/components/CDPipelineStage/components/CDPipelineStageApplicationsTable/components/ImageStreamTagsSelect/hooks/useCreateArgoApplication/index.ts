import {
    createApplicationInstance,
    editApplicationInstance,
} from '../../../../../../../../../../../../configs/k8s-resource-instances/custom-resources/application';
import { CRUD_TYPES } from '../../../../../../../../../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../../../../../../../../../hooks/useResourceCreationMutation';
import { ApplicationKubeObject } from '../../../../../../../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/Application/types';
import { EDPCDPipelineKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCDPipelineStage/types';
import { EnrichedApplicationWithItsImageStreams } from '../../../../../../../../../../../../k8s/EDPCodebase/hooks/useEnrichedApplicationsWithImageStreamsQuery';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPGitServer/types';
import { React } from '../../../../../../../../../../../../plugin.globals';

interface CreateArgoApplicationProps {
    gitServers: EDPGitServerKubeObjectInterface[];
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    enrichedApplicationWithItsImageStreams: EnrichedApplicationWithItsImageStreams;
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    imageTag: string;
}

interface EditArgoApplicationProps {
    argoApplication: ApplicationKubeObjectInterface;
    enrichedApplicationWithItsImageStreams: EnrichedApplicationWithItsImageStreams;
    imageTag: string;
}

interface DeleteArgoApplicationProps {
    argoApplication: ApplicationKubeObjectInterface;
}

export const useCreateArgoApplication = () => {
    const argoApplicationCreateMutation = useResourceCRUDMutation<
        ApplicationKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('argoApplicationCreateMutation', ApplicationKubeObject, CRUD_TYPES.CREATE);

    const argoApplicationEditMutation = useResourceCRUDMutation<
        ApplicationKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('argoApplicationEditMutation', ApplicationKubeObject, CRUD_TYPES.EDIT);

    const argoApplicationDeleteMutation = useResourceCRUDMutation<
        ApplicationKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('argoApplicationDeleteMutation', ApplicationKubeObject, CRUD_TYPES.DELETE);

    const createArgoApplication = React.useCallback(
        async ({
            gitServers,
            CDPipeline,
            currentCDPipelineStage,
            enrichedApplicationWithItsImageStreams,
            imageStream,
            imageTag,
        }: CreateArgoApplicationProps): Promise<void> => {
            const [gitServer] = gitServers.filter(
                el =>
                    el.metadata.name ===
                    enrichedApplicationWithItsImageStreams.application.spec.gitServer
            );

            const argoApplicationData = createApplicationInstance({
                CDPipeline,
                currentCDPipelineStage,
                enrichedApplicationWithItsImageStreams,
                imageStream,
                imageTag,
                gitServer,
            });

            argoApplicationCreateMutation.mutate(argoApplicationData);
        },
        [argoApplicationCreateMutation]
    );

    const editArgoApplication = React.useCallback(
        async ({
            argoApplication,
            enrichedApplicationWithItsImageStreams,
            imageTag,
        }: EditArgoApplicationProps): Promise<void> => {
            const argoApplicationData: ApplicationKubeObjectInterface = editApplicationInstance({
                argoApplication,
                enrichedApplicationWithItsImageStreams,
                imageTag,
            });

            argoApplicationEditMutation.mutate(argoApplicationData);
        },
        [argoApplicationEditMutation]
    );

    const deleteArgoApplication = React.useCallback(
        async ({ argoApplication }: DeleteArgoApplicationProps): Promise<void> => {
            argoApplicationDeleteMutation.mutate(argoApplication);
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
