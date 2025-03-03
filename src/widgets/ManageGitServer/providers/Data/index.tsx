import React from 'react';
import { useCodebasesByGitServerLabelQuery } from '../../../../k8s/groups/EDP/Codebase/hooks/useCodebasesByGitServerLabelQuery';
import { DataContext } from './context';
import { DataContextProviderProps } from './types';

export const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
  gitServer,
  gitServerSecret,
  permissions,
}) => {
  const codebasesByGitServerQuery = useCodebasesByGitServerLabelQuery({
    props: { codebaseGitServer: gitServer?.spec.gitProvider },
  });

  return (
    <DataContext.Provider
      value={{
        gitServer,
        gitServerSecret,
        permissions,
        codebasesByGitServerQuery,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
