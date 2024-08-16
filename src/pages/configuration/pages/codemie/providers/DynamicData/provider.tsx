import React from 'react';
import { SecretKubeObject } from '../../../../../../k8s/groups/default/Secret';
import { SECRET_LABEL_SECRET_TYPE } from '../../../../../../k8s/groups/default/Secret/labels';
import { CodemieKubeObject } from '../../../../../../k8s/groups/EDP/Codemie';
import { CodemieApplicationKubeObject } from '../../../../../../k8s/groups/EDP/CodemieApplication';
import { CodemieProjectKubeObject } from '../../../../../../k8s/groups/EDP/CodemieProject';
import { CodemieProjectSettingsKubeObject } from '../../../../../../k8s/groups/EDP/CodemieProjectSettings';
import { QuickLinkKubeObject } from '../../../../../../k8s/groups/EDP/QuickLink';
import { SYSTEM_QUICK_LINKS } from '../../../../../../k8s/groups/EDP/QuickLink/constants';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const [codemieQuickLink, codemieQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.CODEMIE,
    getDefaultNamespace()
  );

  const [codemie, codemieError] = CodemieKubeObject.useList();
  const [codemieProject, codemieProjectError] = CodemieProjectKubeObject.useList();
  const [codemieProjectSettings, codemieProjectSettingsError] =
    CodemieProjectSettingsKubeObject.useList();

  const [codemieSecrets, codemieSecretsError] = SecretKubeObject.useList({
    labelSelector: `${SECRET_LABEL_SECRET_TYPE}=codemie`,
  });

  const [codemieApplications, codemieApplicationsError] = CodemieApplicationKubeObject.useList();

  const codemieSecret = codemieSecrets?.[0];

  const DataContextValue = React.useMemo(
    () => ({
      codemieQuickLink: {
        data: codemieQuickLink,
        isLoading: codemieQuickLink === null && !codemieQuickLinkError,
        error: codemieQuickLinkError,
      },
      codemie: {
        data: codemie,
        isLoading: codemie === null,
        error: codemieError,
      },
      codemieProject: {
        data: codemieProject,
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
        isLoading: codemieSecrets === null,
        error: codemieSecretsError,
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
      codemieSecrets,
      codemieSecretsError,
    ]
  );

  return (
    <DynamicDataContext.Provider value={DataContextValue}>{children}</DynamicDataContext.Provider>
  );
};
