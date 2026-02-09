import React from 'react';
import { LoadingWrapper } from '../../../../../components/LoadingWrapper';
import { CODEBASE_TYPE } from '../../../../../constants/codebaseTypes';
import { useCodebasesByTypeLabelQuery } from '../../../../../k8s/groups/EDP/Codebase/hooks/useCodebasesByTypeLabelQuery';
import { CurrentDialogContext } from './context';
import { CurrentDialogContextProviderProps } from './types';

export const CurrentDialogContextProvider: React.FC<CurrentDialogContextProviderProps> = ({
  children,
  props,
  state,
}) => {
  const { data, isLoading } = useCodebasesByTypeLabelQuery(
    CODEBASE_TYPE.APPLICATION,
    props.CDPipelineData?.metadata.namespace
  );

  const CurrentDialogContextValue = React.useMemo(
    () => ({
      props,
      state,
      extra: {
        applications: data?.items,
      },
    }),
    [data?.items, props, state]
  );

  return (
    <CurrentDialogContext.Provider value={CurrentDialogContextValue}>
      <LoadingWrapper isLoading={isLoading}>{children}</LoadingWrapper>
    </CurrentDialogContext.Provider>
  );
};
