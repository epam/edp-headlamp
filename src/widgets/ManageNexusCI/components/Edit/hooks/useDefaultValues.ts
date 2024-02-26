import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { NEXUS_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageNexusIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageNexusIntegrationSecretFormDataContext;
}) => {
  const { nexusSecret, nexusQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [NEXUS_INTEGRATION_SECRET_FORM_NAMES.username.name]: safeDecode(nexusSecret?.data?.username),
      [NEXUS_INTEGRATION_SECRET_FORM_NAMES.password.name]: safeDecode(nexusSecret?.data?.password),
      [NEXUS_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(nexusSecret?.data?.url),
      [NEXUS_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: nexusQuickLink?.spec.url,
    };
  }, [nexusQuickLink, nexusSecret]);
};
