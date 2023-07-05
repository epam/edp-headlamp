import React from 'react';
import {
    createArgoApplicationInstance,
    editApplicationInstance,
} from '../../../../configs/k8s-resource-instances/custom-resources/application';
import { CRUD_TYPES } from '../../../../constants/crudTypes';
import { useResourceCRUDMutation } from '../../../../hooks/useResourceCreationMutation';
import { EDPCDPipelineKubeObjectInterface } from '../../../EDPCDPipeline/types';
import { EDPCDPipelineStageKubeObjectInterface } from '../../../EDPCDPipelineStage/types';
import { EDPCodebaseKubeObjectInterface } from '../../../EDPCodebase/types';
import { EDPCodebaseImageStreamKubeObjectInterface } from '../../../EDPCodebaseImageStream/types';
import { EDPGitServerKubeObjectInterface } from '../../../EDPGitServer/types';
import { ApplicationKubeObject } from '../../index';
import { ApplicationKubeObjectInterface } from '../../types';

interface CreateArgoApplicationProps {
    gitServers: EDPGitServerKubeObjectInterface[];
    CDPipeline: EDPCDPipelineKubeObjectInterface;
    currentCDPipelineStage: EDPCDPipelineStageKubeObjectInterface;
    application: EDPCodebaseKubeObjectInterface;
    imageStream: EDPCodebaseImageStreamKubeObjectInterface;
    imageTag: string;
}

interface EditArgoApplicationProps {
    argoApplication: ApplicationKubeObjectInterface;
    application: EDPCodebaseKubeObjectInterface;
    imageTag: string;
}

interface DeleteArgoApplicationProps {
    argoApplication: ApplicationKubeObjectInterface;
}

export const useCreateArgoApplication = () => {
    const argoApplicationCreateMutation = useResourceCRUDMutation<
        ApplicationKubeObjectInterface,
        CRUD_TYPES.CREATE
    >('argoApplicationCreateMutation', ApplicationKubeObject, CRUD_TYPES.CREATE, false);

    const argoApplicationEditMutation = useResourceCRUDMutation<
        ApplicationKubeObjectInterface,
        CRUD_TYPES.EDIT
    >('argoApplicationEditMutation', ApplicationKubeObject, CRUD_TYPES.EDIT, false);

    const argoApplicationDeleteMutation = useResourceCRUDMutation<
        ApplicationKubeObjectInterface,
        CRUD_TYPES.DELETE
    >('argoApplicationDeleteMutation', ApplicationKubeObject, CRUD_TYPES.DELETE, false);

    const createArgoApplication = React.useCallback(
        async ({
            gitServers,
            CDPipeline,
            currentCDPipelineStage,
            application,
            imageStream,
            imageTag,
        }: CreateArgoApplicationProps): Promise<void> => {
            const [gitServer] = gitServers.filter(
                el => el.metadata.name === application.spec.gitServer
            );

            const argoApplicationData = createArgoApplicationInstance({
                CDPipeline,
                currentCDPipelineStage,
                application,
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
            application,
            imageTag,
        }: EditArgoApplicationProps): Promise<void> => {
            const argoApplicationData: ApplicationKubeObjectInterface = editApplicationInstance({
                argoApplication,
                application,
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
