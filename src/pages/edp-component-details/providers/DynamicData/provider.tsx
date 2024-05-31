import React from 'react';
import { useParams } from 'react-router-dom';
import { EDPCodebaseKubeObject } from '../../../../k8s/EDPCodebase';
import { ComponentDetailsRouteParams } from '../../types';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const { namespace, name } = useParams<ComponentDetailsRouteParams>();

  const [component, error] = EDPCodebaseKubeObject.useGet(name, namespace);

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
