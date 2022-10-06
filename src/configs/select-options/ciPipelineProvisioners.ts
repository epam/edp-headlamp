import { CI_PIPELINE_PROVISIONERS } from '../../constants/ciPipelineProvisioners';
import { SelectOption } from '../../types/forms';

export const ciPipelineProvisionerSelectOptions: SelectOption[] = [
    {
        label: CI_PIPELINE_PROVISIONERS['DEFAULT'],
        value: CI_PIPELINE_PROVISIONERS['DEFAULT'],
    },
    {
        label: CI_PIPELINE_PROVISIONERS['GITHUB'],
        value: CI_PIPELINE_PROVISIONERS['GITHUB'],
    },
    {
        label: CI_PIPELINE_PROVISIONERS['GITLAB'],
        value: CI_PIPELINE_PROVISIONERS['GITLAB'],
    },
];
