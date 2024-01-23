import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '../../../../../providers/Form/components/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../../../providers/Form/components/FormControlLabelWithTooltip';
import { FieldEvent } from '../../../../../types/forms';
import { createReleaseNameString } from '../../../../../utils/createReleaseNameString';
import { createVersioningString } from '../../../../../utils/createVersioningString';
import { getMajorMinorPatchOfVersion } from '../../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../../utils/getVersionAndPostfixFromVersioningString';
import { RELEASE_BRANCH_POSTFIX } from '../../../constants';
import { CODEBASE_BRANCH_FORM_NAMES } from '../../../names';
import { CreateCodebaseBranchFormValues } from '../../../types';
import { ReleaseBranchProps } from './types';

const createReleaseName = (versionFieldValue: string) => {
  if (!versionFieldValue) {
    return;
  }
  const { version } = getVersionAndPostfixFromVersioningString(versionFieldValue);
  const { major, minor } = getMajorMinorPatchOfVersion(version);

  return createReleaseNameString(major, minor);
};

export const ReleaseBranch = ({ defaultBranchVersion }: ReleaseBranchProps) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<CreateCodebaseBranchFormValues>();

  const handleReleaseValueChange = React.useCallback(
    ({ target: { value } }: FieldEvent) => {
      const { version, releaseBranchVersionStart, defaultBranchVersionPostfix } = getValues();
      if (!version || !defaultBranchVersion) {
        return;
      }

      const { postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);
      const newReleaseName = createReleaseName(version);
      const newReleaseBranchName = value ? newReleaseName : undefined;
      const branchVersionPostfix = value ? RELEASE_BRANCH_POSTFIX : postfix;
      const newVersion = value
        ? createVersioningString(releaseBranchVersionStart, RELEASE_BRANCH_POSTFIX)
        : createVersioningString(releaseBranchVersionStart, postfix);

      const [currentBranchVersion] = newVersion.split('-');
      const { major, minor, patch } = getMajorMinorPatchOfVersion(currentBranchVersion);
      const newDefaultBranchMinor = minor + 1;
      const defaultBranchNewVersion = [major, newDefaultBranchMinor, patch].join('.');

      setValue(CODEBASE_BRANCH_FORM_NAMES.releaseBranchName.name, newReleaseBranchName);
      setValue(CODEBASE_BRANCH_FORM_NAMES.releaseBranchVersionPostfix.name, branchVersionPostfix);
      setValue(CODEBASE_BRANCH_FORM_NAMES.version.name, newVersion);
      setValue(CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionStart.name, defaultBranchNewVersion);

      if (!defaultBranchVersionPostfix) {
        setValue(CODEBASE_BRANCH_FORM_NAMES.defaultBranchVersionPostfix.name, postfix);
      }
    },
    [defaultBranchVersion, getValues, setValue]
  );

  return (
    <FormCheckbox
      {...register(CODEBASE_BRANCH_FORM_NAMES.release.name, {
        onChange: handleReleaseValueChange,
      })}
      label={<FormControlLabelWithTooltip label={'Release branch'} />}
      control={control}
      errors={errors}
    />
  );
};
