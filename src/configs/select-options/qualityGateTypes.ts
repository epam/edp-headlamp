import { QUALITY_GATE_TYPES } from '../../constants/qualityGateTypes';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const qualityGateTypeSelectOptions: SelectOption[] = [
    {
        label: capitalizeFirstLetter(QUALITY_GATE_TYPES['MANUAL']),
        value: QUALITY_GATE_TYPES['MANUAL'],
    },
    {
        label: capitalizeFirstLetter(QUALITY_GATE_TYPES['AUTOTESTS']),
        value: QUALITY_GATE_TYPES['AUTOTESTS'],
    },
];
