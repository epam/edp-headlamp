import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { APPLICATION_NAMES } from '../names';

export const useNames = (): {
    names: {
        [key: string]: FormNameObject;
    };
} => {
    const names = React.useMemo(() => {
        return APPLICATION_NAMES;
    }, []);

    return { names };
};
