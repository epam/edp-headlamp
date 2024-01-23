import React from 'react';
import { SONAR_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageSonarIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageSonarIntegrationSecretFormDataContext;
}) => {
  const { sonarEDPComponent } = formData;

  return React.useMemo(() => {
    return {
      [SONAR_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: sonarEDPComponent?.spec.url,
    };
  }, [sonarEDPComponent]);
};
