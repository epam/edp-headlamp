import React from 'react';
import { ARGOCD_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageArgoCDIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageArgoCDIntegrationSecretFormDataContext;
}) => {
  const { argoCDQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [ARGOCD_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: argoCDQuickLink?.spec.url,
    };
  }, [argoCDQuickLink]);
};
