import { ApiProxy, K8s } from '@kinvolk/headlamp-plugin/lib';
import { KubeObjectListInterface } from '../../types/k8s';
import { streamResults } from '../common/streamResults';
import { SecretKubeObjectConfig } from './config';
import { ARGO_CD_SECRET_LABEL_SECRET_TYPE, SECRET_LABEL_SECRET_TYPE } from './labels';
import { SecretKubeObjectInterface, StreamSecretsProps } from './types';

const {
    name: { pluralForm },
    version,
} = SecretKubeObjectConfig;

export class SecretKubeObject extends K8s.secret.default {
    static getClusterSecretList(
        namespace: string
    ): Promise<KubeObjectListInterface<SecretKubeObjectInterface>> {
        const url = `/api/${version}/namespaces/${namespace}/${pluralForm}?labelSelector=${ARGO_CD_SECRET_LABEL_SECRET_TYPE}=cluster`;

        return ApiProxy.request(url);
    }

    static streamRegistrySecrets({
        namespace,
        dataHandler,
        errorHandler,
    }: StreamSecretsProps): () => void {
        const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${SECRET_LABEL_SECRET_TYPE}=registry`,
        });
    }

    static streamSonarIntegrationSecrets({
        namespace,
        dataHandler,
        errorHandler,
    }: StreamSecretsProps): () => void {
        const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${SECRET_LABEL_SECRET_TYPE}=sonar`,
        });
    }

    static streamNexusIntegrationSecrets({
        namespace,
        dataHandler,
        errorHandler,
    }: StreamSecretsProps): () => void {
        const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${SECRET_LABEL_SECRET_TYPE}=nexus`,
        });
    }

    static streamDefectDojoIntegrationSecrets({
        namespace,
        dataHandler,
        errorHandler,
    }: StreamSecretsProps): () => void {
        const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${SECRET_LABEL_SECRET_TYPE}=defectdojo`,
        });
    }

    static streamJiraIntegrationSecrets({
        namespace,
        dataHandler,
        errorHandler,
    }: StreamSecretsProps): () => void {
        const url = `/api/${version}/namespaces/${namespace}/${pluralForm}`;
        return streamResults(url, dataHandler, errorHandler, {
            labelSelector: `${SECRET_LABEL_SECRET_TYPE}=jira`,
        });
    }
}
