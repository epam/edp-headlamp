import React from 'react';
import { JOB_PROVISIONERS } from '../../../../../constants/jobProvisioners';
import { TRIGGER_TYPES } from '../../../../../constants/triggerTypes';
import { FormNameObject } from '../../../../../types/forms';

interface useDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    stagesQuantity: number;
}

export const useDefaultValues = ({
    names,
    stagesQuantity,
}: useDefaultValuesProps): { [key: string]: any } => {
    const baseDefaultValues = React.useMemo(() => {
        return {
            [names.order.name]: stagesQuantity,
            [names.triggerType.name]: TRIGGER_TYPES['MANUAL'],
            [names.jobProvisioning.name]: JOB_PROVISIONERS['DEFAULT'],
            [names.sourceLibraryName.name]: 'default',
            [names.sourceType.name]: 'default',
        };
    }, [names, stagesQuantity]);

    return { baseDefaultValues };
};
