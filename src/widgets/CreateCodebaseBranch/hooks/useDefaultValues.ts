import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { useDialogContext } from '../../../providers/Dialog/hooks';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../constants';
import { CODEBASE_BRANCH_FORM_NAMES } from '../names';
import { CreateCodebaseBranchDialogForwardedProps, CreateCodebaseBranchFormValues } from '../types';

interface useDefaultValuesProps {
    defaultBranchVersion: string;
}

export const useDefaultValues = ({ defaultBranchVersion }: useDefaultValuesProps) => {
    const { dialogProviderState } = useDialogContext<CreateCodebaseBranchDialogForwardedProps>();

    const versioningType =
        dialogProviderState?.[CREATE_CODEBASE_BRANCH_DIALOG_NAME].forwardedProps?.codebase?.spec
            .versioning.type;

    return React.useMemo(() => {
        let base: Partial<CreateCodebaseBranchFormValues> = {
            [CODEBASE_BRANCH_FORM_NAMES.fromCommit.name]: '',
            [CODEBASE_BRANCH_FORM_NAMES.release.name]: false,
        };

        if (versioningType !== CODEBASE_VERSIONING_TYPES.EDP) {
            return base;
        }

        base = {
            ...base,
            [CODEBASE_BRANCH_FORM_NAMES.version.name]: defaultBranchVersion,
        };

        return base;
    }, [versioningType, defaultBranchVersion]);
};
