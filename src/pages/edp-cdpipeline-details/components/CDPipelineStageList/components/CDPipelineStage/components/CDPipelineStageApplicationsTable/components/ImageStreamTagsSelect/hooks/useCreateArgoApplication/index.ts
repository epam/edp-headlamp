import { createArgoApplicationInstance } from '../../../../../../../../../../../../configs/k8s-resource-instances/custom-resources/argo-application';
import { ArgoApplicationKubeObject } from '../../../../../../../../../../../../k8s/ArgoApplication';
import { ArgoApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/ArgoApplication/types';
import { getGerritList } from '../../../../../../../../../../../../k8s/Gerrit';
import { Notistack, React } from '../../../../../../../../../../../../plugin.globals';
import { createErrorMessage } from '../../../../../../../../../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../../../../../../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

interface createArgoApplicationInterface {
    pipelineName: string;
    stageName: string;
    appName: string;
    imageName: string;
    imageTag: string;
    namespace: string;
}

export const useCreateArgoApplication = (
    onSuccess,
    onError
): {
    createArgoApplication: ({
        pipelineName,
        stageName,
        appName,
        imageName,
        imageTag,
        namespace,
    }: createArgoApplicationInterface) => Promise<ArgoApplicationKubeObjectInterface>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createArgoApplication = React.useCallback(
        async ({
            pipelineName,
            stageName,
            appName,
            imageName,
            imageTag,
            namespace,
        }: createArgoApplicationInterface): Promise<ArgoApplicationKubeObjectInterface> => {
            let newArgoApplicationData: ArgoApplicationKubeObjectInterface;

            try {
                const { items } = await getGerritList(namespace);
                const [gerrit] = items;
                const {
                    spec: { sshPort },
                } = gerrit;

                newArgoApplicationData = createArgoApplicationInstance({
                    pipelineName,
                    stageName,
                    appName,
                    imageName,
                    imageTag,
                    port: sshPort,
                    namespace,
                });

                const argoApplicationPostRequestResult =
                    await ArgoApplicationKubeObject.apiEndpoint.post(newArgoApplicationData);

                onSuccess();
                return argoApplicationPostRequestResult;
            } catch (err) {
                const errorMessage = createErrorMessage(err, newArgoApplicationData.metadata.name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createArgoApplication };
};
