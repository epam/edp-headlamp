import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../../constants/codebaseVersioningTypes';
import { useTypedFormContext } from '../../../hooks/useFormContext';
import { CODEBASE_FROM_TEMPLATE_FORM_NAMES } from '../../../names';

const defaultEDPVersioningValue = '0.1.0-SNAPSHOT';

export const useUpdateVersioningFields = (): void => {
  const { watch, setValue } = useTypedFormContext();
  const versioningStartFromFieldValue = watch(
    CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name
  );
  const versioningTypeFieldValue = watch(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningType.name);

  React.useEffect(() => {
    if (
      versioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.EDP &&
      !versioningStartFromFieldValue
    ) {
      setValue(
        CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name,
        defaultEDPVersioningValue
      );
    }

    if (versioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.DEFAULT) {
      setValue(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFrom.name, undefined);
    }

    if (versioningStartFromFieldValue) {
      const [version, snapshot] = versioningStartFromFieldValue.split('-');
      setValue(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromVersion.name, version);
      setValue(CODEBASE_FROM_TEMPLATE_FORM_NAMES.versioningStartFromPostfix.name, snapshot);
    }
  }, [setValue, versioningStartFromFieldValue, versioningTypeFieldValue]);
};
