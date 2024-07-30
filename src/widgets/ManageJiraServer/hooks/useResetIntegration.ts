import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { SecretKubeObject } from '../../../k8s/groups/default/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { JiraServerKubeObject } from '../../../k8s/groups/EDP/JiraServer';
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
