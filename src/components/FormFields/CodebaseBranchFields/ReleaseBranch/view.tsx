import { useFormContext } from 'react-hook-form';
import { React } from '../../../../plugin.globals';
import { FieldEvent } from '../../../../types/forms';
import { createReleaseNameString } from '../../../../utils/createReleaseNameString';
import { createVersioningString } from '../../../../utils/createVersioningString';
import { getMajorMinorPatchOfVersion } from '../../../../utils/getMajorMinorPatchOfVersion';
import { getVersionAndPostfixFromVersioningString } from '../../../../utils/getVersionAndPostfixFromVersioningString';
import { FormCheckbox } from '../../../FormComponents/FormCheckbox';
import { FormControlLabelWithTooltip } from '../../../FormComponents/FormControlLabelWithTooltip';
import { ReleaseBranchProps } from './types';

export const ReleaseBranch = ({
    names,
    handleFormFieldChange,
    defaultBranchVersion,
}: ReleaseBranchProps) => {
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
        ({ target: { name, value } }: FieldEvent) => {
            if (!versionFieldValue || !defaultBranchVersion) {
                return;
            }

            const { postfix } = getVersionAndPostfixFromVersioningString(defaultBranchVersion);

            const newPostfix = 'RC';
            const branchName = value ? releaseName : 'your-branch-name';
            const branchFormValueName = value ? releaseName : undefined;
            const branchVersionPostfix = value ? newPostfix : postfix;
            const newVersion = value
                ? createVersioningString(versionStartFieldValue, newPostfix)
                : createVersioningString(versionStartFieldValue, postfix);

            setValue(names.branchName.name, branchFormValueName);

            handleFormFieldChange({
                name: names.branchName.name,
                value: branchName,
            });

            setValue(names.branchVersionPostfix.name, branchVersionPostfix);

            handleFormFieldChange({
                name: names.version.name,
                value: newVersion,
            });

            handleFormFieldChange({ name, value });
        },
        [
            defaultBranchVersion,
            handleFormFieldChange,
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
