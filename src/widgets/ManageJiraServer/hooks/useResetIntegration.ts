import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { JiraServerKubeObject } from '../../../k8s/JiraServer';
import { SecretKubeObject } from '../../../k8s/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/Secret/types';
import { useDeleteKubeObject } from '../../DeleteKubeObject/hooks/useDeleteKubeObject';

export const useResetIntegration = () => {
  const {
    deleteKubeObject,
    mutations: { kubeObjectDeleteMutation },
  } = useDeleteKubeObject({});

  const isLoading = kubeObjectDeleteMutation.isLoading;

  const resetJiraIntegration = async ({
    jiraServer,
    jiraServerSecret,
  }: {
    jiraServer: JiraServerKubeObject;
    jiraServerSecret: SecretKubeObjectInterface;
  }) => {
    await deleteKubeObject({
      kubeObjectData: jiraServer as unknown as KubeObjectInterface,
      kubeObject: JiraServerKubeObject,
    });
    await deleteKubeObject({
      kubeObjectData: jiraServerSecret,
      kubeObject: SecretKubeObject,
    });
  };

  return { resetJiraIntegration, isLoading };
};
