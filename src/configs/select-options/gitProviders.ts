import { GIT_PROVIDERS } from '../../constants/gitProviders';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const gitProviderOptions: SelectOption[] = [
    {
        label: capitalizeFirstLetter(GIT_PROVIDERS['GERRIT']),
        value: GIT_PROVIDERS['GERRIT'],
    },
    {
        label: capitalizeFirstLetter(GIT_PROVIDERS['GITLAB']),
        value: GIT_PROVIDERS['GITLAB'],
    },
    {
        label: capitalizeFirstLetter(GIT_PROVIDERS['GITHUB']),
        value: GIT_PROVIDERS['GITHUB'],
    },
];
