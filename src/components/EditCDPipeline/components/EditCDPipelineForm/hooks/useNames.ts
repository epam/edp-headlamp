import React from 'react';
import { FormNameObject } from '../../../../../types/forms';
import { CDPIPELINE_EDIT_FORM_NAMES } from '../names';

export const useNames = (): {
    names: {
        [key: string]: FormNameObject;
    };
} => {
    const names = React.useMemo(() => {
        return CDPIPELINE_EDIT_FORM_NAMES;
    }, []);

    return { names };
};
