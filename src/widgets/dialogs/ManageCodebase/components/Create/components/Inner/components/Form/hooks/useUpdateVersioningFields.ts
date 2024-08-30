import React from 'react';
import { CODEBASE_VERSIONING_TYPES } from '../../../../../../../../../../constants/codebaseVersioningTypes';
import { useTypedFormContext } from '../../../../../../../hooks/useFormContext';
import { CODEBASE_FORM_NAMES } from '../../../../../../../names';

const defaultEDPVersioningValue = '0.1.0-SNAPSHOT';

export const useUpdateVersioningFields = () => {
  const { watch, setValue } = useTypedFormContext();

  const versioningStartFromFieldValue = watch(CODEBASE_FORM_NAMES.versioningStartFrom.name);
  const versioningTypeFieldValue = watch(CODEBASE_FORM_NAMES.versioningType.name);

  React.useEffect(() => {
    if (
      versioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.EDP &&
      !versioningStartFromFieldValue
    ) {
      setValue(CODEBASE_FORM_NAMES.versioningStartFrom.name, defaultEDPVersioningValue, {
        shouldDirty: false,
      });
    }

    if (versioningTypeFieldValue === CODEBASE_VERSIONING_TYPES.DEFAULT) {
      setValue(CODEBASE_FORM_NAMES.versioningStartFrom.name, undefined, {
        shouldDirty: false,
      });
    }

    if (versioningStartFromFieldValue) {
      const [version, snapshot] = versioningStartFromFieldValue.split('-');
      setValue(CODEBASE_FORM_NAMES.versioningStartFromVersion.name, version, {
        shouldDirty: false,
      });
      setValue(CODEBASE_FORM_NAMES.versioningStartFromSnapshot.name, snapshot, {
        shouldDirty: false,
      });
    }
  }, [setValue, versioningStartFromFieldValue, versioningTypeFieldValue]);
};
