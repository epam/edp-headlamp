import { DEPLOYMENT_TYPES } from '../../constants/deploymentTypes';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const deploymentTypeSelectOptions: SelectOption[] = [
  {
    label: capitalizeFirstLetter(DEPLOYMENT_TYPES['CONTAINER']),
    value: DEPLOYMENT_TYPES['CONTAINER'],
  },
  {
    label: capitalizeFirstLetter(DEPLOYMENT_TYPES['CUSTOM']),
    value: DEPLOYMENT_TYPES['CUSTOM'],
  },
];
