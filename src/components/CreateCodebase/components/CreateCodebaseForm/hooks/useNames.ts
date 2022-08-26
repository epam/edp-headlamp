import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../../../../../constants/codebaseTypes';
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
        if (type === CODEBASE_TYPE_APPLICATION) {
            return APPLICATION_NAMES;
        }

        if (type === CODEBASE_TYPE_LIBRARY) {
            return LIBRARY_NAMES;
        }

        if (type === CODEBASE_TYPE_AUTOTEST) {
            return AUTOTEST_NAMES;
        }
    }, [type]);

    return { names };
};
