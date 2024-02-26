import React from 'react';
import { safeDecode } from '../../../../../utils/decodeEncode';
import { DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDefectDojoIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageDefectDojoIntegrationSecretFormDataContext;
}) => {
  const { defectDojoSecret, defectDojoQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.token.name]: safeDecode(
        defectDojoSecret?.data?.token
      ),
      [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.url.name]: safeDecode(defectDojoSecret?.data?.url),
      [DEFECT_DOJO_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]: defectDojoQuickLink?.spec.url,
    };
  }, [defectDojoSecret, defectDojoQuickLink]);
};
