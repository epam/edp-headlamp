import React from 'react';
import { FORM_MODES } from '../../../../types/forms';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { GitServerProps } from './types';

export const GitServerForm = ({ mode }: GitServerProps) => {
  return mode === FORM_MODES.CREATE ? <Create /> : FORM_MODES.EDIT ? <Edit /> : null;
};
