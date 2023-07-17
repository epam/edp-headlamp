import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useDefaultCIToolQuery } from '../../../../../k8s/EDPComponent/hooks/useDefaultCIToolQuery';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';

export const useUpdateDefaultValues = () => {
    const { data: defaultCITool } = useDefaultCIToolQuery();
    const { setValue } = useFormContext();

    React.useEffect(() => {
        if (!defaultCITool) {
            return;
        }

        setValue(CODEBASE_FROM_TEMPLATE_FORM_NAMES.ciTool.name, defaultCITool, {
            shouldDirty: false,
        });
    }, [defaultCITool, setValue]);
};
