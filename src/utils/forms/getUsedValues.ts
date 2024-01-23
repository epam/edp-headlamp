import { FieldValues } from 'react-hook-form';
import { FormNameObject } from '../../types/forms';

export const getUsedValues = (values: FieldValues, names: { [key: string]: FormNameObject }) => {
  let result: FieldValues;

  for (const [key, value] of Object.entries(values)) {
    const nameObject = names?.[key];
    const isUsedInResourceCreation = nameObject && Object.hasOwn(nameObject, 'path');

    if (value === '' || value === null || !nameObject || !isUsedInResourceCreation) {
      continue;
    }

    result = {
      ...result,
      [key]: value,
    };
  }

  return result;
};
