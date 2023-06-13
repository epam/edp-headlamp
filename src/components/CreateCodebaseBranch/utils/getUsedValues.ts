import { FieldValues } from 'react-hook-form';
import { CreateCodebaseBranchFormNames } from '../types';

export const getUsedValues = (values: FieldValues, names: CreateCodebaseBranchFormNames) => {
    let result: FieldValues;

    for (const [key, value] of Object.entries(values)) {
        const nameObject = names[key];
        const isUsedInResourceCreation = Object.hasOwn(nameObject, 'path');

        if (!nameObject || !isUsedInResourceCreation) {
            continue;
        }

        result = {
            ...result,
            [key]: value,
        };
    }

    return result;
};
