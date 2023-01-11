import {
    createApplicationInstance,
    editApplicationInstance,
} from '../../../../../../../../../../../../configs/k8s-resource-instances/custom-resources/application';
import { ApplicationKubeObject } from '../../../../../../../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/Application/types';
import { EDPGitServerKubeObjectInterface } from '../../../../../../../../../../../../k8s/EDPGitServer/types';
import { Notistack, React } from '../../../../../../../../../../../../plugin.globals';
import { createErrorMessage } from '../../../../../../../../../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../../../../../../../../../utils/throwErrorNoty';
import {
    createApplicationInterface,
    deleteApplicationInterface,
    editApplicationInterface,
} from './types';

const { useSnackbar } = Notistack;

export const useApplicationCRUD = ({
    gitServers,
}: {
    gitServers: EDPGitServerKubeObjectInterface[];
}): {
    createApplication: (
        props: createApplicationInterface
    ) => Promise<ApplicationKubeObjectInterface>;
    editApplication: (props: editApplicationInterface) => Promise<ApplicationKubeObjectInterface>;
    deleteApplication: (
        props: deleteApplicationInterface
    ) => Promise<ApplicationKubeObjectInterface>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createApplication = React.useCallback(
        async ({
            CDPipeline,
            currentCDPipelineStage,
            enrichedApplication,
            imageStream,
            imageTag,
        }: createApplicationInterface): Promise<ApplicationKubeObjectInterface> => {
            let newArgoApplicationData: ApplicationKubeObjectInterface;

            try {
                const {
                    application: {
                        spec: { gitServer: gitServerName },
                    },
                } = enrichedApplication;
                const [gitServer] = gitServers.filter(el => el.spec.gitProvider === gitServerName);

                newArgoApplicationData = createApplicationInstance({
                    CDPipeline,
                    currentCDPipelineStage,
                    enrichedApplication,
                    imageStream,
                    imageTag,
                    gitServer,
                });

                return await ApplicationKubeObject.apiEndpoint.post(newArgoApplicationData);
            } catch (err) {
                const errorMessage = createErrorMessage(err, newArgoApplicationData.metadata.name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                throw err;
            }
        },
        [enqueueSnackbar, gitServers]
    );

    const editApplication = React.useCallback(
        async ({
            argoApplication,
            enrichedApplication,
            imageTag,
        }: editApplicationInterface): Promise<ApplicationKubeObjectInterface> => {
            let newApplicationData: ApplicationKubeObjectInterface;

            try {
                newApplicationData = editApplicationInstance({
                    argoApplication,
                    enrichedApplication,
                    imageTag,
                });
                return await ApplicationKubeObject.apiEndpoint.put(newApplicationData);
            } catch (err) {
                const errorMessage = createErrorMessage(err, newApplicationData.metadata.name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                throw err;
            }
        },
        [enqueueSnackbar]
    );

    const deleteApplication = React.useCallback(
        async ({
            argoApplication,
        }: deleteApplicationInterface): Promise<ApplicationKubeObjectInterface> => {
            try {
                return await ApplicationKubeObject.apiEndpoint.delete(
                    argoApplication.metadata.namespace,
                    argoApplication.metadata.name
                );
            } catch (err) {
                const errorMessage = createErrorMessage(err, argoApplication.metadata.name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                throw err;
            }
        },
        [enqueueSnackbar]
    );

    return { createApplication, editApplication, deleteApplication };
};
