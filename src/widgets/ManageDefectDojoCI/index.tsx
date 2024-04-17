import React from 'react';
import { FORM_MODES } from '../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { ManageDefectDojoIntegrationSecretProps } from './types';

export const ManageDefectDojoCI = ({ formData }: ManageDefectDojoIntegrationSecretProps) => {
  const { mode } = formData;

  return (
    <div data-testid="form">
      {mode === FORM_MODES.CREATE ? (
        <Create formData={formData} />
      ) : mode === FORM_MODES.EDIT ? (
        <Edit formData={formData} />
      ) : null}
    </div>
  );
};
