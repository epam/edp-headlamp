import { DEPLOYMENT_SCRIPTS } from '../../constants/deploymentScripts';
import { SelectOption } from '../../types/forms';

export const deploymentScriptSelectOptions: SelectOption[] = [
    {
        label: DEPLOYMENT_SCRIPTS['HELM_CHART'],
        value: DEPLOYMENT_SCRIPTS['HELM_CHART'],
    },
];
