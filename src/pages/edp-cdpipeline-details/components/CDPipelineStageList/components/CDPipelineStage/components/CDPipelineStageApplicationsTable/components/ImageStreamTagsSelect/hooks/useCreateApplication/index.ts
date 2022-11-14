import { createApplicationInstance } from '../../../../../../../../../../../../configs/k8s-resource-instances/custom-resources/application';
import { ApplicationKubeObject } from '../../../../../../../../../../../../k8s/Application';
import { ApplicationKubeObjectInterface } from '../../../../../../../../../../../../k8s/Application/types';
import { getGerritList } from '../../../../../../../../../../../../k8s/Gerrit';
import { Notistack, React } from '../../../../../../../../../../../../plugin.globals';
import { createErrorMessage } from '../../../../../../../../../../../../utils/createErrorMessage';
import { throwErrorNoty } from '../../../../../../../../../../../../utils/throwErrorNoty';

const { useSnackbar } = Notistack;

export interface createApplicationInterface {
    pipelineName: string;
    stageName: string;
    appName: string;
    imageName: string;
    imageTag: string;
    namespace: string;
    versioningType: string;
}

export const useCreateApplication = (
    onSuccess,
    onError
): {
    createApplication: ({
        pipelineName,
        stageName,
        appName,
        imageName,
        imageTag,
        namespace,
    }: createApplicationInterface) => Promise<ApplicationKubeObjectInterface>;
} => {
    const { enqueueSnackbar } = useSnackbar();

    const createApplication = React.useCallback(
        async ({
            pipelineName,
            stageName,
            appName,
            imageName,
            imageTag,
            namespace,
            versioningType,
        }: createApplicationInterface): Promise<ApplicationKubeObjectInterface> => {
            let newApplicationData: ApplicationKubeObjectInterface;

            try {
                const { items } = await getGerritList(namespace);
                const [gerrit] = items;
                const {
                    spec: { sshPort },
                } = gerrit;

                newApplicationData = createApplicationInstance({
                    pipelineName,
                    stageName,
                    appName,
                    imageName,
                    imageTag,
                    port: sshPort,
                    namespace,
                    versioningType,
                });

                const applicationPostRequestResult = await ApplicationKubeObject.apiEndpoint.post(
                    newApplicationData
                );

                onSuccess();
                return applicationPostRequestResult;
            } catch (err) {
                const errorMessage = createErrorMessage(err, newApplicationData.metadata.name);
                throwErrorNoty(enqueueSnackbar, errorMessage);
                onError();
                throw err;
            }
        },
        [enqueueSnackbar, onError, onSuccess]
    );

    return { createApplication };
};
