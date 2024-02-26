import React from 'react';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageDefectDojoIntegrationSecretFormDataContext;
}) => {
  const { defectDojoQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: defectDojoQuickLink?.spec.url,
    };
  }, [defectDojoQuickLink]);
};
