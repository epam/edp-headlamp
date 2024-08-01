import React from 'react';
import { FormTextField } from '../../../../../../providers/Form/components/FormTextField';
import { useFormsContext } from '../../../../hooks/useFormsContext';
import { CODEMIE_PROJECT_FORM_NAMES } from '../../../../names';

export const ProjectName = () => {
  const {
    forms: { codemieProject },
  } = useFormsContext();

  return (
    <FormTextField
      {...codemieProject.form.register(CODEMIE_PROJECT_FORM_NAMES.projectName.name)}
      label={'Project Name'}
      placeholder={'Enter Project Name'}
      control={codemieProject.form.control}
      errors={codemieProject.form.formState.errors}
      disabled
    />
  );
};
