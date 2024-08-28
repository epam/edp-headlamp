import React from 'react';
import { STAGE_FORM_NAMES } from '../../../names';
import { useCurrentDialog } from '../../../providers/CurrentDialog/hooks';

export const useDefaultValues = () => {
  const {
    props: { stage },
  } = useCurrentDialog();

  return React.useMemo(
    () => ({
      [STAGE_FORM_NAMES.triggerType.name]: stage?.spec.triggerType,
      [STAGE_FORM_NAMES.triggerTemplate.name]: stage?.spec.triggerTemplate,
      [STAGE_FORM_NAMES.cleanTemplate.name]: stage?.spec.cleanTemplate,
    }),
    [stage]
  );
};
