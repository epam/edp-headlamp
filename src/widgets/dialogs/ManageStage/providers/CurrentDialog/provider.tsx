import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { useCleanTriggerTemplateListQuery } from '../../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useCleanTriggerTemplateListQuery';
import { useDeployTriggerTemplateListQuery } from '../../../../../k8s/groups/Tekton/TriggerTemplate/hooks/useDeployTriggerTemplateListQuery';
import { CurrentDialogContext } from './context';
import { CurrentDialogContextProviderProps } from './types';

export const CurrentDialogContextProvider: React.FC<CurrentDialogContextProviderProps> = ({
  children,
  props,
  state,
}) => {
  const {
    data: cleanTriggerTemplateList,
    isLoading: cleanTriggerTemplateListIsLoading,
    error: cleanTriggerTemplateListError,
  } = useCleanTriggerTemplateListQuery();

  const {
    data: deployTriggerTemplateList,
    isLoading: deployTriggerTemplateListIsLoading,
    error: deployTriggerTemplateListError,
  } = useDeployTriggerTemplateListQuery();

  const CurrentDialogContextValue = React.useMemo(
    () => ({
      props,
      state,
      extra: {
        cleanTriggerTemplateList: {
          data: cleanTriggerTemplateList,
          isLoading: cleanTriggerTemplateListIsLoading,
          error: cleanTriggerTemplateListError as ApiError,
        },
        deployTriggerTemplateList: {
          data: deployTriggerTemplateList,
          isLoading: deployTriggerTemplateListIsLoading,
          error: deployTriggerTemplateListError as ApiError,
        },
      },
    }),
    [
      props,
      state,
      cleanTriggerTemplateList,
      cleanTriggerTemplateListIsLoading,
      cleanTriggerTemplateListError,
      deployTriggerTemplateList,
      deployTriggerTemplateListIsLoading,
      deployTriggerTemplateListError,
    ]
  );

  return (
    <CurrentDialogContext.Provider value={CurrentDialogContextValue}>
      {children}
    </CurrentDialogContext.Provider>
  );
};
