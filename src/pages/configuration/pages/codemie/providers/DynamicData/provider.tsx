import React from 'react';
import { SecretKubeObject } from '../../../../../../k8s/groups/default/Secret';
import { SecretKubeObjectInterface } from '../../../../../../k8s/groups/default/Secret/types';
import { CodemieKubeObject } from '../../../../../../k8s/groups/EDP/Codemie';
import { CodemieKubeObjectInterface } from '../../../../../../k8s/groups/EDP/Codemie/types';
import { CodemieApplicationKubeObject } from '../../../../../../k8s/groups/EDP/CodemieApplication';
import { CodemieApplicationKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieApplication/types';
import { CodemieProjectKubeObject } from '../../../../../../k8s/groups/EDP/CodemieProject';
import { CodemieProjectKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieProject/types';
import { CodemieProjectSettingsKubeObject } from '../../../../../../k8s/groups/EDP/CodemieProjectSettings';
import { CodemieProjectSettingsKubeObjectInterface } from '../../../../../../k8s/groups/EDP/CodemieProjectSettings/types';
import { QuickLinkKubeObject } from '../../../../../../k8s/groups/EDP/QuickLink';
import { SYSTEM_QUICK_LINKS } from '../../../../../../k8s/groups/EDP/QuickLink/constants';
import { QuickLinkKubeObjectInterface } from '../../../../../../k8s/groups/EDP/QuickLink/types';
import { getDefaultNamespace } from '../../../../../../utils/getDefaultNamespace';
import { DynamicDataContext } from './context';

export const DynamicDataContextProvider: React.FC = ({ children }) => {
  const defaultNamespace = getDefaultNamespace();
  const [_codemieQuickLink, codemieQuickLinkError] = QuickLinkKubeObject.useGet(
    SYSTEM_QUICK_LINKS.CODEMIE,
    defaultNamespace
  );
  const codemieQuickLink = _codemieQuickLink as
    | {
        jsonData: QuickLinkKubeObjectInterface;
      }
    | null
    | undefined;

  const [_codemie, codemieError] = CodemieKubeObject.useGet('codemie', defaultNamespace);

  const codemie = _codemie as
    | {
        jsonData: CodemieKubeObjectInterface;
      }
    | null
    | undefined;
  const [_codemieProject, codemieProjectError] = CodemieProjectKubeObject.useGet(
    defaultNamespace,
    defaultNamespace
  );

  const codemieProject = _codemieProject as
    | {
        jsonData: CodemieProjectKubeObjectInterface;
      }
    | null
    | undefined;
  const [_codemieProjectSettings, codemieProjectSettingsError] =
    CodemieProjectSettingsKubeObject.useList({
      namespace: defaultNamespace,
    });

  const codemieProjectSettings = _codemieProjectSettings as
    | CodemieProjectSettingsKubeObjectInterface[]
    | null;

  const [_codemieSecret, codemieSecretError] = SecretKubeObject.useGet('codemie', defaultNamespace);
  const codemieSecret = _codemieSecret as
    | {
        jsonData: SecretKubeObjectInterface;
      }
    | null
    | undefined;
  const [_codemieApplications, codemieApplicationsError] = CodemieApplicationKubeObject.useList({
    namespace: defaultNamespace,
  });

  const codemieApplications = _codemieApplications as
    | CodemieApplicationKubeObjectInterface[]
    | null;

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
        data: codemieSecret?.jsonData,
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
