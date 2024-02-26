import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageSonarIntegrationSecretFormDataContext;
}) => {
  const { sonarSecret, sonarQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [SONAR_INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(sonarSecret?.data?.token),
      [SONAR_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(sonarSecret?.data?.url),
      [SONAR_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: sonarQuickLink?.spec.url,
    };
  }, [sonarQuickLink, sonarSecret]);
};
