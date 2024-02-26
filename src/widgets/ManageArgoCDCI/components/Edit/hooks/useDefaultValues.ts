import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { ARGOCD_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageArgoCDIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageArgoCDIntegrationSecretFormDataContext;
}) => {
  const { argoCDSecret, argoCDQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [ARGOCD_INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(argoCDSecret?.data?.token),
      [ARGOCD_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(argoCDSecret?.data?.url),
      [ARGOCD_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: argoCDQuickLink?.spec.url,
    };
  }, [argoCDSecret, argoCDQuickLink]);
};
