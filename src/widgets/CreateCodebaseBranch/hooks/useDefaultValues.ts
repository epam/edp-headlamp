import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../constants/codebaseVersioningTypes';
import { useSpecificDialogContext } from '../../../providers/Dialog/hooks';
import { getVersionAndPostfixFromVersioningString } from '../../../utils/getVersionAndPostfixFromVersioningString';
import { CREATE_CODEBASE_BRANCH_DIALOG_NAME } from '../constants';
import { CODEBASE_BRANCH_FORM_NAMES } from '../names';
import { CreateCodebaseBranchDialogForwardedProps, CreateCodebaseBranchFormValues } from '../types';

interface useDefaultValuesProps {
  defaultBranchVersion: string;
}

export const useDefaultValues = ({ defaultBranchVersion }: useDefaultValuesProps) => {
  const {
    forwardedProps: { codebase: codebaseData },
  } = useSpecificDialogContext<CreateCodebaseBranchDialogForwardedProps>(
    CREATE_CODEBASE_BRANCH_DIALOG_NAME
  );

  const versioningType = codebaseData?.spec.versioning.type;

  return React.useMemo(() => {
    let base: Partial<CreateCodebaseBranchFormValues> = {
      [CODEBASE_BRANCH_FORM_NAMES.fromCommit.name]: '',
      [CODEBASE_BRANCH_FORM_NAMES.release.name]: false,
    };

    if (!defaultBranchVersion) {
      return base;
    }

    if (versioningType !== CODEBASE_VERSIONING_TYPES.EDP) {
      return base;
    }

    const { version, postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);

    base = {
      ...base,
      [CODEBASE_BRANCH_FORM_NAMES.version.name]: defaultBranchVersion,
      [CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionStart.name]: version,
      [CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionPostfix.name]: postfix,
    };

    return base;
  }, [versioningType, defaultBranchVersion]);
};
