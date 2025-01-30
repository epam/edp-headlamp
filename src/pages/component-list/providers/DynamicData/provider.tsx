import { ApiError } from '@kinvolk/headlamp-plugin/lib/lib/k8s/apiProxy';
import React from 'react';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { GitServerKubeObject } from '../../../../k8s/groups/EDP/GitServer';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [codebases, setCodebases] = React.useState<CodebaseKubeObjectInterface[] | null>(null);
  const [codebasesErrors, setCodebasesErrors] = React.useState<ApiError[] | null>(null);

  CodebaseKubeObject.useApiList(
    (data) => setCodebases(data),
    (error) => {
      setCodebasesErrors((prev) => (prev ? [...prev, error] : [error]));
    }
  );

  const [gitServers, gitServerError] = GitServerKubeObject.useList();

  const DataContextValue = React.useMemo(
    () => ({
      codebases: {
        data: codebases,
        errors: codebasesErrors,
        isLoading: codebases === null,
      },
      gitServers: {
        data: gitServers,
        isLoading: gitServers === null,
        error: gitServerError,
      },
    }),
    [codebases, codebasesErrors, gitServerError, gitServers]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
