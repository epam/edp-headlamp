import React from 'react';
import { DEPLOYMENT_TYPES } from '../../../../../constants/deploymentTypes';
import { FormNameObject } from '../../../../../types/forms';

interface UseDefaultValuesProps {
    names: { [key: string]: FormNameObject };
}

export const useDefaultValues = ({ names }: UseDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.deploymentType.name]: DEPLOYMENT_TYPES['CONTAINER'],
        };
    }, [names]);

    return { baseDefaultValues };
};
