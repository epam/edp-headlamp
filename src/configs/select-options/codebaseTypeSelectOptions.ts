import { CODEBASE_TYPES } from '../../constants/codebaseTypes';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const codebaseTypeSelectOptions: SelectOption[] = [
    {
        label: capitalizeFirstLetter(CODEBASE_TYPES['ALL']),
        value: CODEBASE_TYPES['ALL'],
    },
    {
        label: capitalizeFirstLetter(CODEBASE_TYPES['APPLICATION']),
        value: CODEBASE_TYPES['APPLICATION'],
    },
    {
        label: capitalizeFirstLetter(CODEBASE_TYPES['AUTOTEST']),
        value: CODEBASE_TYPES['AUTOTEST'],
    },
    {
        label: capitalizeFirstLetter(CODEBASE_TYPES['INFRASTRUCTURE']),
        value: CODEBASE_TYPES['INFRASTRUCTURE'],
    },
    {
        label: capitalizeFirstLetter(CODEBASE_TYPES['LIBRARY']),
        value: CODEBASE_TYPES['LIBRARY'],
    },
];
