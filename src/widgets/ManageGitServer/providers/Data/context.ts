import React from 'react';
import { UseQueryResult } from 'react-query';
import { SecretKubeObjectInterface } from '../../../../k8s/groups/default/Secret/types';
import { CodebaseKubeObjectInterface } from '../../../../k8s/groups/EDP/Codebase/types';
import { GitServerKubeObjectInterface } from '../../../../k8s/groups/EDP/GitServer/types';
import { KubeObjectListInterface } from '../../../../types/k8s';
import { WidgetPermissions } from '../../types';
import { DataContextProviderValue } from './types';

export const DataContext = React.createContext<DataContextProviderValue>({
  gitServer: null as unknown as GitServerKubeObjectInterface,
  gitServerSecret: null as unknown as SecretKubeObjectInterface,
  permissions: null as unknown as WidgetPermissions,
  codebasesByGitServerQuery: null as unknown as UseQueryResult<
    KubeObjectListInterface<CodebaseKubeObjectInterface>,
    Error
  >,
  handleClosePanel: () => {
    //
  },
});
