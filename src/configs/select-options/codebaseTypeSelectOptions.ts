import { CODEBASE_TYPE } from '../../constants/codebaseTypes';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const codebaseTypeSelectOptions: SelectOption[] = [
  CODEBASE_TYPE.ALL,
  CODEBASE_TYPE.APPLICATION,
  CODEBASE_TYPE.AUTOTEST,
  CODEBASE_TYPE.INFRASTRUCTURE,
  CODEBASE_TYPE.LIBRARY,
].map((value) => ({
  label: capitalizeFirstLetter(value),
  value,
}));
