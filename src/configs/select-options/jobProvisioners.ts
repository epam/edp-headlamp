import { JOB_PROVISIONERS } from '../../constants/jobProvisioners';
import { SelectOption } from '../../types/forms';
import { capitalizeFirstLetter } from '../../utils/format/capitalizeFirstLetter';

export const jobProvisionerSelectOptions: SelectOption[] = [
    {
        label: capitalizeFirstLetter(JOB_PROVISIONERS['DEFAULT']),
        value: JOB_PROVISIONERS['DEFAULT'],
    },
];
