import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { CODEBASE_EDIT_NAMES } from '../names';

export const useNames = (): {
    names: {
        [key: string]: FormNameObject;
    };
} => {
    const names = React.useMemo(() => {
        return CODEBASE_EDIT_NAMES;
    }, []);

    return { names };
};
