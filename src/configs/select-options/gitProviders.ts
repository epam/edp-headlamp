import { GIT_PROVIDER } from '../../constants/gitProviders';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const gitProviderOptions: SelectOption[] = [
  GIT_PROVIDER.GERRIT,
  GIT_PROVIDER.GITLAB,
  GIT_PROVIDER.GITHUB,
  GIT_PROVIDER.BITBUCKET,
].map((value) => ({
  label: capitalizeFirstLetter(value),
  value,
}));
