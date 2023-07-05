import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FieldEvent } from '../../../../types/forms';
import { createReleaseNameString } from '../../../../utils/createReleaseNameString';
import { createVersioningString } from '../../../../utils/createVersioningString';
import { getMajorMinorPatchOfVersion } from '../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../utils/getVersionAndPostfixFromVersioningString';
import { FormCheckbox, FormControlLabelWithTooltip } from '../../../FormComponents';
import { RELEASE_BRANCH_POSTFIX } from '../../constants';
import { ReleaseBranchProps } from './types';

export const ReleaseBranch = ({ names, defaultBranchVersion }: ReleaseBranchProps) => {
    const {
        register,
        control,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();

    const versionFieldValue = watch(names.version.name);
    const versionStartFieldValue = watch(names.branchVersionStart.name);

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

            setValue(names.branchName.name, branchName);
            setValue(names.branchVersionPostfix.name, branchVersionPostfix);
            setValue(names.version.name, newVersion);
        },
        [
            defaultBranchVersion,
            names,
            releaseName,
            setValue,
            versionFieldValue,
            versionStartFieldValue,
        ]
    );

    return (
        <FormCheckbox
            {...register(names.release.name, {
                onChange: handleReleaseValueChange,
            })}
            label={<FormControlLabelWithTooltip label={'Release branch'} />}
            control={control}
            errors={errors}
        />
    );
};
