import React from 'react';
import { useParams } from 'react-router-dom';
import { CodebaseKubeObject } from '../../../../k8s/groups/EDP/Codebase';
import { ComponentDetailsRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<ComponentDetailsRouteParams>();

  const [component, error] = CodebaseKubeObject.useGet(name, namespace);

  const DataContextValue = React.useMemo(
    () => ({
      component: {
        data: component?.jsonData,
        error: error,
        isLoading: component === null,
      },
    }),
    [component, error]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
