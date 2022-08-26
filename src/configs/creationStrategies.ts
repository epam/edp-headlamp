import {
    CODEBASE_TYPE_APPLICATION,
    CODEBASE_TYPE_AUTOTEST,
    CODEBASE_TYPE_LIBRARY,
} from '../constants/codebaseTypes';
import { SelectOption } from '../types/forms';

export const creationStrategies: { [key: string]: SelectOption } = {
    create: { value: 'create', label: 'Create' },
    clone: { value: 'clone', label: 'Clone' },
    import: { value: 'import', label: 'Import' },
};

export const getCreationStrategies = (type: string): SelectOption[] => {
    if (type === CODEBASE_TYPE_APPLICATION || type === CODEBASE_TYPE_LIBRARY) {
        return [creationStrategies.create, creationStrategies.clone, creationStrategies.import];
    }

    if (type === CODEBASE_TYPE_AUTOTEST) {
        return [creationStrategies.clone, creationStrategies.import];
    }
};
