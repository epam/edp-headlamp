import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGIES } from '../../constants/creationStrategies';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const creationStrategiesSelectOptions: SelectOption[] = [
  {
    label: capitalizeFirstLetter(CODEBASE_CREATION_STRATEGIES['CREATE']),
    value: CODEBASE_CREATION_STRATEGIES['CREATE'],
  },
  {
    label: capitalizeFirstLetter(CODEBASE_CREATION_STRATEGIES['CLONE']),
    value: CODEBASE_CREATION_STRATEGIES['CLONE'],
  },
  {
    label: capitalizeFirstLetter(CODEBASE_CREATION_STRATEGIES['IMPORT']),
    value: CODEBASE_CREATION_STRATEGIES['IMPORT'],
  },
];

export const getCreationStrategySelectOptionsByCodebaseType = (type: string): SelectOption[] => {
  if (type === CODEBASE_TYPES['APPLICATION'] || type === CODEBASE_TYPES['LIBRARY']) {
    return creationStrategiesSelectOptions;
  }

  if (type === CODEBASE_TYPES['AUTOTEST']) {
    return creationStrategiesSelectOptions.filter(
      ({ value }) =>
        value === CODEBASE_CREATION_STRATEGIES['CLONE'] ||
        value === CODEBASE_CREATION_STRATEGIES['IMPORT']
    );
  }
};
