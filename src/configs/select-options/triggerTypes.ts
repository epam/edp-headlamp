import { TRIGGER_TYPES } from '../../constants/triggerTypes';
import { SelectOption } from '../../types/forms';

export const triggerTypeSelectOptions: SelectOption[] = [
  {
    label: TRIGGER_TYPES['MANUAL'],
    value: TRIGGER_TYPES['MANUAL'],
  },
  {
    label: TRIGGER_TYPES['AUTO'],
    value: TRIGGER_TYPES['AUTO'],
  },
];
