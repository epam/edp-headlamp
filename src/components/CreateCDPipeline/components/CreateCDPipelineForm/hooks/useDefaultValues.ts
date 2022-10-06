import { DEPLOYMENT_TYPES } from '../../../../../constants/deploymentTypes';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
}

export const useDefaultValues = ({ names }: UseDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.deploymentType.name]: DEPLOYMENT_TYPES['CONTAINER'],
        };
    }, [names.deploymentType.name]);

    return { baseDefaultValues };
};
