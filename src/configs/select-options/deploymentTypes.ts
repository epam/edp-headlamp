import { DEPLOYMENT_TYPE } from '../../constants/deploymentTypes';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const deploymentTypeSelectOptions: SelectOption[] = [
  DEPLOYMENT_TYPE.CONTAINER,
  DEPLOYMENT_TYPE.CUSTOM,
].map((value) => ({
  label: capitalizeFirstLetter(value),
  value,
}));
