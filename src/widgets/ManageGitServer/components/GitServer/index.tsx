import React from 'react';
import { FORM_MODES } from '../../../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { GitServerFormProps } from './types';

export const GitServerForm = ({ mode, formRef }: GitServerFormProps) => {
  return mode === FORM_MODES.CREATE ? (
    <Create formRef={formRef} />
  ) : FORM_MODES.EDIT ? (
    <Edit formRef={formRef} />
  ) : null;
};
