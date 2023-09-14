import React from 'react';
import { EDP_COMPONENT_FORM_NAMES } from '../names';
import { ManageEDPComponentDataContext } from '../types';

export const useDefaultValues = ({ formData }: { formData: ManageEDPComponentDataContext }) => {
    const { currentElement } = formData;

    const isPlaceholder = typeof currentElement === 'string' && currentElement === 'placeholder';

    return React.useMemo(() => {
        if (isPlaceholder) {
            return {};
        }

        return {
            [EDP_COMPONENT_FORM_NAMES.icon.name]: currentElement?.spec?.icon,
            [EDP_COMPONENT_FORM_NAMES.name.name]: currentElement?.spec?.type,
            [EDP_COMPONENT_FORM_NAMES.url.name]: currentElement?.spec?.url,
        };
    }, [currentElement, isPlaceholder]);
};
