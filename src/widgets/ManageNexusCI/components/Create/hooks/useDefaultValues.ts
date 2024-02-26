import React from 'react';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageNexusIntegrationSecretFormDataContext;
}) => {
  const { nexusQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [NEXUS_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: nexusQuickLink?.spec.url,
    };
  }, [nexusQuickLink]);
};
