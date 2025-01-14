import React from 'react';
import { SecretKubeObject } from '../../../../../../k8s/groups/default/Secret';
import { CodemieKubeObject } from '../../../../../../k8s/groups/EDP/Codemie';
import { CodemieApplicationKubeObject } from '../../../../../../k8s/groups/EDP/CodemieApplication';
import { CodemieProjectKubeObject } from '../../../../../../k8s/groups/EDP/CodemieProject';
import { CodemieProjectSettingsKubeObject } from '../../../../../../k8s/groups/EDP/CodemieProjectSettings';
import { QuickLinkKubeObject } from '../../../../../../k8s/groups/EDP/QuickLink';
import { SYSTEM_QUICK_LINKS } from '../../../../../../k8s/groups/EDP/QuickLink/constants';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const defaultNamespace = getDefaultNamespace();
  const [codemieQuickLink, codemieQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.CODEMIE,
    defaultNamespace
  );

  const [codemie, codemieError] = CodemieKubeObject.useGet('codemie', defaultNamespace);
  const [codemieProject, codemieProjectError] = CodemieProjectKubeObject.useGet(
    defaultNamespace,
    defaultNamespace
  );
  const [codemieProjectSettings, codemieProjectSettingsError] =
    CodemieProjectSettingsKubeObject.useList({
      namespace: defaultNamespace,
    });

  const [codemieSecret, codemieSecretError] = SecretKubeObject.useGet('codemie', defaultNamespace);

  const [codemieApplications, codemieApplicationsError] = CodemieApplicationKubeObject.useList({
    namespace: defaultNamespace,
  });

  const DataContextValue = React.useMemo(
    () => ({
      codemieQuickLink: {
        data: codemieQuickLink?.jsonData,
        isLoading: codemieQuickLink === null && !codemieQuickLinkError,
        error: codemieQuickLinkError,
      },
      codemie: {
        data: codemie?.jsonData,
        isLoading: codemie === null,
        error: codemieError,
      },
      codemieProject: {
        data: codemieProject?.jsonData,
        isLoading: codemieProject === null,
        error: codemieProjectError,
      },
      codemieProjectSettings: {
        data: codemieProjectSettings,
        isLoading: codemieProjectSettings === null,
        error: codemieProjectSettingsError,
      },
      codemieApplications: {
        data: codemieApplications,
        isLoading: codemieApplications === null,
        error: codemieApplicationsError,
      },
      codemieSecret: {
        data: codemieSecret,
        isLoading: codemieSecret === null,
        error: codemieSecretError,
      },
    }),
    [
      codemie,
      codemieApplications,
      codemieApplicationsError,
      codemieError,
      codemieProject,
      codemieProjectError,
      codemieProjectSettings,
      codemieProjectSettingsError,
      codemieQuickLink,
      codemieQuickLinkError,
      codemieSecret,
      codemieSecretError,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
