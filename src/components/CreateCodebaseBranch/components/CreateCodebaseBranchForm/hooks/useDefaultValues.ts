import { CODEBASE_VERSIONING_TYPES } from '../../../../../constants/codebaseVersioningTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../../../k8s/EDPCodebase/types';
import { React } from '../../../../../plugin.globals';
import { FormNameObject } from '../../../../../types/forms';
import { DeepPartial } from '../../../../../types/global';

interface useDefaultValuesProps {
    names: { [key: string]: FormNameObject };
    codebaseData: DeepPartial<EDPCodebaseKubeObjectInterface>;
    defaultBranchVersion: string;
}

export const useDefaultValues = ({
    names,
    codebaseData,
    defaultBranchVersion,
}: useDefaultValuesProps): { [key: string]: any } => {
    const {
        spec: {
            versioning: { type },
        },
    } = codebaseData;

    const baseDefaultValues = React.useMemo(() => {
        let base = {
            [names.fromCommit.name]: '',
            [names.release.name]: false,
        };

        if (type !== CODEBASE_VERSIONING_TYPES['EDP']) {
            return base;
        }

        base = {
            ...base,
            [names.version.name]: defaultBranchVersion,
        };

        return base;
    }, [names, type, defaultBranchVersion]);

    return { baseDefaultValues };
};
