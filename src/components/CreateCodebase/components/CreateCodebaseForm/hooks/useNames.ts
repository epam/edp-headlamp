import { CODEBASE_TYPES } from '../../../../../constants/codebaseTypes';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { APPLICATION_NAMES, AUTOTEST_NAMES, LIBRARY_NAMES } from '../names';

export const useNames = ({
    type,
}: {
    type: string;
}): {
    names: {
        [key: string]: FormNameObject;
    };
} => {
    const names = React.useMemo(() => {
        if (type === CODEBASE_TYPES['APPLICATION']) {
            return APPLICATION_NAMES;
        }

        if (type === CODEBASE_TYPES['LIBRARY']) {
            return LIBRARY_NAMES;
        }

        if (type === CODEBASE_TYPES['AUTOTEST']) {
            return AUTOTEST_NAMES;
        }
    }, [type]);

    return { names };
};
