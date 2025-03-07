import { CODEBASE_VERSIONING_TYPE } from '../../constants/codebaseVersioningTypes';
import { SelectOption } from '../../types/forms';

export const codebaseVersioningTypeSelectOptions: SelectOption[] = [
  CODEBASE_VERSIONING_TYPE.DEFAULT,
  CODEBASE_VERSIONING_TYPE.SEMVER,
].map((value) => ({
  label: value,
  value,
}));
