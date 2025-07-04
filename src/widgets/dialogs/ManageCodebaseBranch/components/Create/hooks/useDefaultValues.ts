import React from 'react';
import { CODEBASE_VERSIONING_TYPE } from '../../../../../../constants/codebaseVersioningTypes';
import { getVersionAndPostfixFromVersioningString } from '../../../../../../utils/getVersionAndPostfixFromVersioningString';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';
import { ManageCodebaseBranchFormValues } from '../../../types';

export const useDefaultValues = () => {
  const {
    props: { codebase, defaultBranch, pipelines },
  } = useCurrentDialog();

  const defaultBranchVersion = defaultBranch?.spec.version;
  const versioningType = codebase?.spec.versioning.type;

  return React.useMemo(() => {
    let base: Partial<ManageCodebaseBranchFormValues> = {
      [CODEBASE_BRANCH_FORM_NAMES.fromCommit.name]: codebase?.spec.defaultBranch,
      [CODEBASE_BRANCH_FORM_NAMES.fromType.name]: 'branch',
      [CODEBASE_BRANCH_FORM_NAMES.release.name]: false,
      [CODEBASE_BRANCH_FORM_NAMES.reviewPipeline.name]: pipelines?.review,
      [CODEBASE_BRANCH_FORM_NAMES.buildPipeline.name]: pipelines?.build,
    };

    if (!defaultBranchVersion) {
      return base;
    }

    if (
      versioningType !== CODEBASE_VERSIONING_TYPE.EDP &&
      versioningType !== CODEBASE_VERSIONING_TYPE.SEMVER
    ) {
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
  }, [
    codebase?.spec.defaultBranch,
    pipelines?.review,
    pipelines?.build,
    defaultBranchVersion,
    versioningType,
  ]);
};
