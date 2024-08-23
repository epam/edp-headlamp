import React from 'react';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const useDefaultValues = () => {
  const {
    props: { codebaseBranch },
  } = useCurrentDialog();

  return React.useMemo(
    () => ({
      [CODEBASE_BRANCH_FORM_NAMES.buildPipeline.name]: codebaseBranch?.spec?.pipelines?.build,
      [CODEBASE_BRANCH_FORM_NAMES.reviewPipeline.name]: codebaseBranch?.spec?.pipelines?.review,
    }),
    [codebaseBranch]
  );
};
