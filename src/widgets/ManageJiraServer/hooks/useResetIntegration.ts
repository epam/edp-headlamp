import { KubeObjectInterface } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { useDeleteKubeObject } from '../../../k8s/common/hooks/useDeleteKubeObject';
import { SecretKubeObject } from '../../../k8s/groups/default/Secret';
import { SecretKubeObjectInterface } from '../../../k8s/groups/default/Secret/types';
import { JiraServerKubeObject } from '../../../k8s/groups/EDP/JiraServer';

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
      variables: jiraServer as unknown as KubeObjectInterface,
      kubeObject: JiraServerKubeObject,
    });
    await deleteKubeObject({
      variables: jiraServerSecret,
      kubeObject: SecretKubeObject,
    });
  };

  return { resetJiraIntegration, isLoading };
};
