import { CODEBASE_VERSIONING_TYPES } from '../../constants/codebaseVersioningTypes';
import { SelectOption } from '../../types/forms';

export const codebaseVersioningTypeSelectOptions: SelectOption[] = [
  {
    label: CODEBASE_VERSIONING_TYPES['DEFAULT'],
    value: CODEBASE_VERSIONING_TYPES['DEFAULT'],
  },
  {
    label: CODEBASE_VERSIONING_TYPES['EDP'],
    value: CODEBASE_VERSIONING_TYPES['EDP'],
  },
];
