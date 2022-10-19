import { CI_TOOLS } from '../../constants/ciTools';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const ciToolSelectOptions: SelectOption[] = [
    {
        label: capitalizeFirstLetter(CI_TOOLS['JENKINS']),
        value: CI_TOOLS['JENKINS'],
    },
    {
        label: capitalizeFirstLetter(CI_TOOLS['TEKTON']),
        value: CI_TOOLS['TEKTON'],
    },
];
