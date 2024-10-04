import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { TemplateKubeObject } from '../../../../k8s/groups/EDP/Template';
import { TemplateKubeObjectInterface } from '../../../../k8s/groups/EDP/Template/types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [templates, setTemplates] = React.useState<TemplateKubeObjectInterface[] | null>(null);
  const [templatesErrors, setTemplatesErrors] = React.useState<ApiError[] | null>(null);

  TemplateKubeObject.useApiList(
    (data) => setTemplates(data),
    (error) => {
      setTemplatesErrors((prev) => (prev ? [...prev, error] : [error]));
    }
  );

  const DataContextValue = React.useMemo(
    () => ({
      templates: {
        data: templates,
        errors: templatesErrors,
        isLoading: templates === null,
      },
    }),
    [templates, templatesErrors]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
