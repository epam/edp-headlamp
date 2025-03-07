import { CODEBASE_TYPE } from '../../constants/codebaseTypes';
import { CODEBASE_CREATION_STRATEGY } from '../../constants/creationStrategies';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const creationStrategiesSelectOptions: SelectOption[] = [
  CODEBASE_CREATION_STRATEGY.CREATE,
  CODEBASE_CREATION_STRATEGY.CLONE,
  CODEBASE_CREATION_STRATEGY.IMPORT,
].map((value) => ({
  label: capitalizeFirstLetter(value),
  value,
}));

export const getCreationStrategySelectOptionsByCodebaseType = (type: string): SelectOption[] => {
  switch (type) {
    case CODEBASE_TYPE.APPLICATION:
    case CODEBASE_TYPE.LIBRARY:
      return creationStrategiesSelectOptions;

    case CODEBASE_TYPE.AUTOTEST:
      return creationStrategiesSelectOptions.filter(
        ({ value }) =>
          value === CODEBASE_CREATION_STRATEGY.CLONE || value === CODEBASE_CREATION_STRATEGY.IMPORT
      );
    default:
      return [];
  }
};
