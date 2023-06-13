import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { EDPCodebaseKubeObjectInterface } from '../../../k8s/EDPCodebase/types';
import { React } from '../../../plugin.globals';
import { CreateCodebaseBranchFormKeys, CreateCodebaseBranchFormNames } from '../types';

interface useDefaultValuesProps {
    names: CreateCodebaseBranchFormNames;
    codebaseData: EDPCodebaseKubeObjectInterface;
    defaultBranchVersion: string;
}

export const useDefaultValues = ({
    names,
    codebaseData,
    defaultBranchVersion,
}: useDefaultValuesProps) => {
    const {
        spec: {
            versioning: { type },
        },
    } = codebaseData;

    return React.useMemo(() => {
        let base: Partial<Record<CreateCodebaseBranchFormKeys, any>> = {
            [names.fromCommit.name]: '',
            [names.release.name]: false,
        };

        if (type !== CODEBASE_VERSIONING_TYPES.EDP) {
            return base;
        }

        base = {
            ...base,
            [names.version.name]: defaultBranchVersion,
        };

        return base;
    }, [names, type, defaultBranchVersion]);
};
