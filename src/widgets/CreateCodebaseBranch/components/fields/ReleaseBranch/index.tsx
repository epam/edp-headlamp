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

export const ReleaseBranch = ({ defaultBranchVersion }: ReleaseBranchProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext<CreateCodebaseBranchFormValues>();

    const versionFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.version.name);
    const versionStartFieldValue = watch(CODEBASE_BRANCH_FORM_NAMES.branchVersionStart.name);

    const releaseName = React.useMemo(() => {
        if (!versionFieldValue || !defaultBranchVersion) {
            return;
        }
        const { version } = getVersionAndPostfixFromVersioningString(versionFieldValue);
        const { major, minor } = getMajorMinorPatchOfVersion(version);

        return createReleaseNameString(major, minor);
    }, [defaultBranchVersion, versionFieldValue]);

    const handleReleaseValueChange = React.useCallback(
        ({ target: { value } }: FieldEvent) => {
            if (!versionFieldValue || !defaultBranchVersion) {
                return;
            }

            const { postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);

            const branchName = value ? releaseName : undefined;
            const branchVersionPostfix = value ? RELEASE_BRANCH_POSTFIX : postfix;
            const newVersion = value
                ? createVersioningString(versionStartFieldValue, RELEASE_BRANCH_POSTFIX)
                : createVersioningString(versionStartFieldValue, postfix);

            setValue(CODEBASE_BRANCH_FORM_NAMES.branchName.name, branchName);
            setValue(CODEBASE_BRANCH_FORM_NAMES.branchVersionPostfix.name, branchVersionPostfix);
            setValue(CODEBASE_BRANCH_FORM_NAMES.version.name, newVersion);
        },
        [defaultBranchVersion, releaseName, setValue, versionFieldValue, versionStartFieldValue]
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
