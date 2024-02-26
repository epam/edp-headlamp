import React from 'react';
import { DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES } from '../../../names';
import { ManageDependencyTrackIntegrationSecretFormDataContext } from '../../../types';

export const useDefaultValues = ({
  formData,
}: {
  formData: ManageDependencyTrackIntegrationSecretFormDataContext;
}) => {
  const { depTrackQuickLink } = formData;

  return React.useMemo(() => {
    return {
      [DEPENDENCY_TRACK_INTEGRATION_SECRET_FORM_NAMES.externalUrl.name]:
        depTrackQuickLink?.spec.url,
    };
  }, [depTrackQuickLink]);
};
