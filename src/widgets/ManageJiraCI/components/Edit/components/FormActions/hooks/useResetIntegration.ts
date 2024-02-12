import { JiraServerKubeObject } from '../../../../../../../k8s/JiraServer';
import { SecretKubeObject } from '../../../../../../../k8s/Secret';
import { useDeleteKubeObject } from '../../../../../../DeleteKubeObject/hooks/useDeleteKubeObject';
import { useFormContext } from '../../../../../hooks/useFormContext';

export const useResetIntegration = ({ onSuccess }) => {
  const {
    formData: { jiraServer, jiraServerSecret },
  } = useFormContext();

  const {
    deleteKubeObject,
    mutations: { kubeObjectDeleteMutation },
  } = useDeleteKubeObject({ onSuccess });

  const isLoading = kubeObjectDeleteMutation.isLoading;

  const resetJiraIntegration = async () => {
    await deleteKubeObject({
      kubeObjectData: jiraServer,
      kubeObject: JiraServerKubeObject,
    });
    await deleteKubeObject({
      kubeObjectData: jiraServerSecret,
      kubeObject: SecretKubeObject,
    });
  };

  return { resetJiraIntegration, isLoading };
};
